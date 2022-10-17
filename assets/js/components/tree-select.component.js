/**
 * 树形图select选项框
 */
class TreeSelectClass {
  constructor(datas, opts) {
    this.directories = datas;

    // eslint-disable-next-line no-undef
    this.globals = globals;
    this.indicator = this.globals.generateSeed();
    this.treepath = [];

    this.$ = this.globals.$;
    this.opts = opts;

    /**
     * 选择模式
     * enums=["directory", "file"]
     * 文件模式(file)下，点击文件夹会进入下一级，只有点击文件才能触发 this.selectCB 方法
     * 文件夹模式(directory)下，不会显示文件列表; 如果指定了获取文件的方法，则此option会被自动转为file模式
     */
    this.selectMode = opts.selectMode || "directory";

    // 当前层级Id
    this.currentId = opts.currentId || null;

    /**
     * 是否提供返回空数据的按钮
     */
    this.offerBlankBtn = opts.offerBlankBtn || false;
    this.blankBtnLabel = opts.blankBtnLabel || "默认位置";

    this.dirNameFunc = opts.dirNameFunc;
    this.fileNameFunc = opts.fileNameFunc;
    this.dirNameField = opts.dirNameField || "name";
    this.fileNameField = opts.fileNameField || "name";
    this.sortField = opts.sortField || opts.dirNameField;

    // 渲染文件条目的方法
    this.renderFileMethod = opts.renderFileMethod;

    // 选中或取消的响应方法定义
    this.selectCB = null;
    this.cancleCB = null;

    // 筛选文件
    this.supportFilter = opts.supportFilter;
    this.filterField = opts.filterField;
    this.filterData = opts.filterData;
    this.filterOptionRendered = opts.filterOptionRendered;

    // 获取文件夹下的全部文件夹的方法
    this.getDirectoriesFunc = opts.getDirectoriesFunc || this.defaultGetDirectoriesFunc.bind(this);
    if (opts.getDirectoriesFunc) {
      this.selectMode = "file";
    }

    // 获取文件夹下的全部文件的方法(默认为空)
    this.getFilesFunc = opts.getFilesFunc || this.defaultGetFilesFunc.bind(this);

    this.loading = `
      <div class="d-flex justify-content-center" style="margin-top: 40px;">
        <div class="spinner-grow text-purple" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    `;

    this.init();
  }

  defaultGetDirectoriesFunc = parentId => {
    if (!this.directories || !Array.isArray(this.directories)) return [];
    return this.directories.reduce((temp, item) => {
      if (parentId) {
        if (item.parentId !== parentId) return temp;
      } else {
        if (item.parentId) return temp;
      }
      temp.push(item);
      return temp;
    }, []);
  };

  defaultGetFilesFunc() {
    return [];
  }

  /**
   * 初始化
   */
  init() {
    const prefix = this.indicator;
    this.$(`#${prefix}-select-mask`).remove();
    this.$(`#${prefix}-select-body`).remove();

    const selectBtn =
      this.selectMode === "file"
        ? `
            <div class="col-4">
            </div>
          `
        : `
          <div class="col-4" id="${prefix}-select-dir-btn" style="font-size:0.9em;">
            <i class="fa-solid fa-check"></i> 确认
          </div>
        `;

    const setBlankBtn = !this.offerBlankBtn
      ? `
          <div class="col-4">
          </div>
        `
      : `
          <div class="col-4" id="${prefix}-default-btn" style="font-size:0.9em;">
            <i class="fa-solid fa-home"></i> ${this.blankBtnLabel}
          </div>
        `;

    const select = `
      <div id="${prefix}-select-mask" class="tree-select-mask">
        <div id="${prefix}-select-body" class="tree-select" style="overflow-x: hidden;">
          <div class="tree-header">
            <div class="row">
              <div class="col-10 tree-title" id="${prefix}-title" ></div>
              <div class="col-2" style="text-align:center;" id="${prefix}-cancel-btn">
                <i class="fa-solid fa-xmark"></i> 
              </div>
            </div>
          </div>

          <div class="tree-subtitle">
            <div class="row">
              <div class="col-8 tree-scroll" id="${prefix}-treepath">
                根目录
              </div>
              <div id="${prefix}-filter-block" class="col-4 tree-scroll" style="text-align: center;">
                <div class=" limit-length" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
                  <i class="fa-solid fa-filter"></i> <span id="${prefix}-filter">全部</span>
                </div>
                <ul id="${prefix}-filter-options" style="height: 300px; overflow-y: auto;" class="dropdown-menu dropdown-menu-end dropdown-menu-lg-start inverse">
                  <li><button class="dropdown-item" type="button">Action</button></li>
                  <li><button class="dropdown-item" type="button">Another action</button></li>
                  <li><button class="dropdown-item" type="button">Something else here</button></li>
                </ul>
              </div>
            </div>
            
          </div>

          <div id="${prefix}-select" class="tree-body">
          </div>

          <div id="${prefix}-footer" class="tree-footer">
            <div class="row">
              ${selectBtn}
              ${setBlankBtn}
              <div class="col-4" style="text-align:right;" id="${prefix}-back-btn">
                <i class="fa-solid fa-chevron-left"></i> 返回
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    this.$("body").append(select);

    // 放在默认位置
    this.$(`#${prefix}-default-btn`).click(async () => {
      if (this.selectCB) {
        await this.selectCB(undefined);
      } else {
        console.log(undefined);
      }
    });

    // 取消
    this.$(`#${prefix}-cancel-btn`).click(async () => {
      await this.hide();
    });

    // 返回按钮
    this.$(`#${prefix}-back-btn`).click(async () => {
      await this.back();
    });

    // 筛选
    if (!this.supportFilter) {
      this.globals.$(`#${prefix}-filter-block`).hide();
      this.globals.$(`#${prefix}-treepath`).removeClass("col-8");
      this.globals.$(`#${prefix}-treepath`).addClass("col-12");
    }
  }

  /**
   * 构建路径
   */
  buildTreePath() {
    const treepath = this.treepath.reduce((temp, itemId, index) => {
      const item = this.directories.find(e => e._id === itemId);
      const curr = !itemId ? `<span>根目录</span>` : !item ? itemId : `<span>${this.getDirName(item)}</span>`;
      const focus = index === this.treepath.length - 1 ? ` style="font-weight:600; color: #eee;" ` : ` style="color: #666;" `;
      const divider = index === 0 ? "" : ` <i class="fa-solid fa-chevron-right"></i> `;
      return temp + divider + `<span ${focus} >${curr}</span>`;
    }, "");

    const prefix = this.indicator;
    this.$(`#${prefix}-treepath`).html(treepath);
  }

  /**
   * 隐藏选项框
   */
  async hide() {
    if (this.cancleCB && typeof this.cancleCB === "function") {
      await this.cancleCB();
    }
    const prefix = this.indicator;
    this.$(`#${prefix}-select-body`).removeClass("active");
    this.$(`#${prefix}-select-mask`).removeClass("active");
    setTimeout(() => {
      this.$(`#${prefix}-select-body`).hide();
      this.$(`#${prefix}-select-mask`).hide();
      this.clear();
    }, 300);
  }

  /**
   * 显示选项框
   * @param {*} itemId 默认显示的位置，为空则打开根目录
   */
  async show(itemId, title, selectCB, cancleCB) {
    this.selectCB = selectCB;
    this.cancleCB = cancleCB;
    const prefix = this.indicator;
    this.$(`#${prefix}-title`).html(title || "选择...");
    this.$(`#${prefix}-select-mask`).show();
    this.$(`#${prefix}-select-body`).show();
    setTimeout(() => {
      this.$(`#${prefix}-select-mask`).addClass("active");
      this.$(`#${prefix}-select-body`).addClass("active");
    }, 0);
    await this.enter(itemId);
  }

  clear() {
    const prefix = this.indicator;
    this.$(`#${prefix}-select-mask`).remove();
    this.$(`#${prefix}-select-body`).remove();
  }

  /**
   * 返回上一层
   */
  async back() {
    const len = this.treepath.length;
    let prevId = null;
    if (len > 1) {
      this.treepath.pop();
      prevId = this.treepath[this.treepath.length - 1];
    }
    await this.build(prevId);
    this.buildTreePath();
  }

  /**
   * 进入目录
   * @param {*} itemId 要进入的目录id
   */
  async enter(itemId) {
    this.treepath.push(itemId);
    await this.build(itemId);
    this.buildTreePath();
  }

  getDirName(item) {
    if (this.dirNameFunc && typeof this.dirNameFunc === "function") {
      return this.dirNameFunc(item);
    }
    return item[this.dirNameField];
  }

  getFileName(item) {
    if (this.fileNameFunc && typeof this.fileNameFunc === "function") {
      return this.fileNameFunc(item);
    }
    return item[this.fileNameField];
  }

  /**
   * 构建文件夹
   * @returns
   */
  async buildDirectories(parentId) {
    const prefix = this.indicator;
    const field = this.sortField;

    const dirIcon = this.selectMode === "file" ? `📁` : ""; // 📂📁
    const directoryIds = [];
    const directories = await this.getDirectoriesFunc(parentId)
      .sort((a, b) => (b[field] > a[field] ? -1 : 1))
      .reduce((temp, item) => {
        const id = `${prefix}-${item._id}`;
        directoryIds.push(id);
        const curr = `
          <div id="${id}" data-id="${item._id}" class="tree-select-option">
            <div class="row">
              <div class="col-12" id="${id}-expand-btn">
                <div class="limit-length">
                  ${dirIcon} ${this.getDirName(item)}
                </div>
              </div>
            </div>
          </div>
        `;
        return temp + curr;
      }, "");

    const binds = () => {
      for (let index = 0; index < directoryIds.length; index++) {
        const id = directoryIds[index];

        // 展开
        if (id !== "default") {
          this.$(`#${id}-expand-btn`).unbind("click");
          this.$(`#${id}-expand-btn`).click(async () => {
            const dataId = this.$(`#${id}`).attr("data-id");
            await this.enter(dataId);
          });
        }
      }
    };

    return { html: directories, binds };
  }

  async buildFieldList(parentId) {
    const prefix = this.indicator;
    const list = await this.getFilesFunc(parentId);
    const binds = [];
    const fullId = `${prefix}-filter-options-${this.filterField}-all`;
    const fullItem = `
      <li id="${fullId}">
        <button class="dropdown-item" type="button">全部</button>
      </li>
    `;

    const distinctList = list.reduce((temp, item) => {
      const data = item[this.filterField];
      Object.assign(temp, { [data]: 1 });
      return temp;
    }, {});
    const options = Object.keys(distinctList).reduce((temp, data, index) => {
      const id = `${prefix}-filter-options-${this.filterField}-${index}`;
      const rendered = typeof this.filterOptionRendered === "function" ? this.filterOptionRendered(data) : data;
      if (!rendered) return temp;
      temp += `
        <li id="${id}">
          <button class="dropdown-item" type="button">${rendered}</button>
        </li>
        `;
      binds.push(() => {
        this.globals.bindClick(id, async () => {
          this.filterData = data;
          await this.build(this.currentId);
          this.globals.$(`#${prefix}-filter`).html(rendered);
        });
      });
      return temp;
    }, fullItem);
    this.globals.$(`#${prefix}-filter-options`).html(options);

    for (let index = 0; index < binds.length; index++) {
      const element = binds[index];
      element();
    }

    this.globals.bindClick(fullId, async () => {
      this.filterData = null;
      await this.build(this.currentId);
      this.globals.$(`#${prefix}-filter`).html(`全部`);
    });
  }

  /**
   * 构建文件列表
   */
  async buildFiles(parentId) {
    if (this.selectMode !== "file") {
      return { html: "", binds: () => {} };
    }

    const prefix = this.indicator;
    const field = this.sortField;

    let files = "";
    const fileIds = [];
    const fileIcon = `<i class="fa-solid fa-file"></i>`;
    const list = await this.getFilesFunc(parentId);
    files = list
      .sort((a, b) => (b[field] > a[field] ? 1 : -1))
      .reduce((temp, item) => {
        if (this.supportFilter && this.filterData) {
          if (item[this.filterField] !== this.filterData) return temp;
        }
        const id = `${prefix}-${item._id}`;
        fileIds.push(id);

        const itemInfo =
          this.renderFileMethod && typeof this.renderFileMethod === "function"
            ? this.renderFileMethod(item)
            : `
              <div class="col-12">
                <div class="limit-length">
                  ${fileIcon} ${this.getFileName(item)}
                </div>
              </div>
            `;
        const curr = `
          <div id="${id}" data-id="${item._id}" class="tree-select-option">
            <div class="row" id="${id}-select-btn">
              ${itemInfo}
            </div>
          </div>
        `;
        return temp + curr;
      }, "");

    const binds = () => {
      for (let index = 0; index < fileIds.length; index++) {
        const id = fileIds[index];

        // 选中按钮
        this.$(`#${id}-select-btn`).unbind("click");
        this.$(`#${id}-select-btn`).click(async () => {
          let dataId = this.$(`#${id}`).attr("data-id");
          if (dataId === "undefined") {
            dataId = undefined;
          }
          if (this.selectCB) {
            await this.selectCB(dataId);
          } else {
            console.log(dataId);
          }
        });
      }
    };

    return { html: files, binds };
  }

  /**
   * 构建指定层级清单
   * @param {*} parentId 指定层级
   */
  async build(parentId) {
    const prefix = this.indicator;
    this.$(`#${prefix}-select`).html(this.loading);

    this.currentId = parentId;

    // 文件夹列表
    const { html: directories, binds: bindsDirectories } = await this.buildDirectories(parentId);

    // 文件列表
    const { html: files, binds: bindsFiles } = await this.buildFiles(parentId);

    // 过滤
    if (this.supportFilter) {
      setTimeout(async () => {
        await this.buildFieldList(parentId);
      }, 0);
    }

    let fullInfo = directories + files;
    if (fullInfo === "") {
      fullInfo = `<div class="small-text" style="text-align:center; margin-top:120px;">没有更多选项了</div>`;
    }
    this.$(`#${prefix}-select`).html(fullInfo);

    // 绑定选中按钮到当前目录
    this.$(`#${prefix}-select-dir-btn`).unbind("click");
    this.$(`#${prefix}-select-dir-btn`).click(async () => {
      if (this.selectCB) {
        await this.selectCB(parentId);
      } else {
        console.log(parentId);
      }
    });

    // 批量绑定
    bindsDirectories();
    bindsFiles();
  }
}
