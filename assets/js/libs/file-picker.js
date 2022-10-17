class FilePickerClass {
  constructor(options) {
    this.fs = options.fs;
    this.$ = options.$;
    this.containerId = "FILEPICKER-panel";

    this.dirpath = [];

    this.modes = {
      file: "file",
      dir: "dir",
    };

    this.isRunning = false;

    this.cancelCB = null;
    this.successCB = null;
    this.mode = this.modes.filedir; // 选择文件或文件夹

    this.filters = null;
  }

  getDirPath() {
    return this.dirpath.reduce((temp, item) => {
      return temp + "/" + item;
    }, "");
  }

  getExtname(filepath) {
    if (typeof filepath !== "string") return "";
    const temp = filepath.split(".");
    return temp[temp.length - 1];
  }
  isMatches(fullPath) {
    if (!this.filters || !Array.isArray(this.filters)) return true;

    const type = this.getExtname(fullPath);
    if (this.filters.includes(type)) return true;

    return false;
  }

  /**
   * 渲染列表
   * @param {*} list
   * @returns
   */
  renderList(list) {
    let dirlist = "";
    let filelist = "";
    list.reduce((temp, item, index) => {
      const id = `${this.containerId}-item${index}`;
      const { name, isFile, fullPath } = item;
      const icon = isFile ? "📄" : "📂";
      const curr = `
        <div id="${id}" class="list-group-item inverse list-group-item-action">${icon} ${name}</div>
      `;
      if (isFile) {
        if (this.mode === this.modes.dir) return temp;
        if (!this.isMatches(fullPath)) return temp;
        filelist += curr;
      } else {
        dirlist += curr;
      }
      return temp;
    }, "");
    return dirlist + filelist;
  }

  /**
   * 返回上级目录
   */
  async backDir() {
    if (this.dirpath.length >= 1) {
      this.dirpath.pop();
    } else {
      return false;
    }

    await this.refreshList();
    return true;
  }

  running() {
    return this.isRunning;
  }

  destroy() {
    this.isRunning = false;
    this.$(`#${this.containerId}`).remove();
  }

  cancel() {
    this.destroy();
    if (this.cancelCB && typeof this.cancelCB === "function") {
      this.cancelCB();
    }
  }

  /**
   * 进入一个目录
   */
  async enterDir(dirname) {
    this.dirpath.push(dirname);

    await this.refreshList();
  }

  /**
   * 刷新当前路径的文件夹和文件列表
   */
  async refreshList() {
    const res = await this.fs.readdir(this.getDirPath());
    if (res.errors) {
      return alert("获取数据失败");
    }
    const list = res.data || [];
    const sorted = list.sort((a, b) => (b.name > a.name ? -1 : 1));
    const listinfo = this.renderList(sorted);
    this.$(`#${this.containerId}-list`).html(listinfo);

    for (let index = 0; index < sorted.length; index++) {
      const entry = sorted[index];
      const { name, isFile } = entry;
      const id = `${this.containerId}-item${index}`;
      this.$(`#${id}`).click(async () => {
        if (isFile) {
          if (this.successCB && typeof this.successCB === "function") {
            this.destroy();
            this.successCB(entry);
          }
        } else {
          await this.enterDir(name);
        }
      });
    }
  }

  /**
   * 显示选择器
   */
  async show(options = {}) {
    this.cancelCB = options.cancelCB;
    this.successCB = options.successCB;
    this.isRunning = true;

    this.$(`#${this.containerId}`).remove();
    const panel = `
      <div id="${this.containerId}" class="file-picker">
        <div class="file-picker-navbar">
          <span style="text-align:left;" id="${this.containerId}-cancel">取消</span>
          <span class="float-end" id="${this.containerId}-returnbtn">返回上一级</span>
        </div>
        <div class="list-group" style="margin-top: 40px;">
          <div id="${this.containerId}-list"></div>
        </div>
      </div>
    `;
    this.$("body").append(panel);

    await this.refreshList();

    this.$(`#${this.containerId}-cancel`).click(() => {
      this.cancel();
    });
    this.$(`#${this.containerId}-returnbtn`).click(() => {
      this.backDir();
    });
  }

  async chooseFile(options = {}) {
    return new Promise(async (resolve) => {
      const { filters } = options;
      if (filters !== undefined) {
        if (typeof filters === "string") {
          this.filters = [filters];
        } else {
          this.filters = filters;
        }
      }
      await FilePicker.show({
        successCB: (entry) => {
          resolve({ data: entry });
        },
        cancelCB: () => {
          resolve({ data: null });
        },
      });
    });
  }
}
