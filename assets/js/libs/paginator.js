class PaginatorClass {
  constructor(options = {}) {
    // 每页显示的文本数量
    this.textPerpage = options.textPerpage || 2000;

    // 显示容器
    this.containerId = options.containerId || "article-window";
    this.slicePrefix = "PAGINATOR-SLICE";

    // 当前加载到的页码
    this.page = 0;

    // 当前阅读到的页码
    this.readPage = 0;
    this.readOffset = 0;

    // 最大页数
    this.maxPages = 0;

    // 总字数
    this.maxWords = 0;

    // 最大允许存活页数，必须为奇数
    // 超出页数将被销毁
    this.maxLivePages = options.maxLivePages || 7;

    // 解析章节
    this.toc = [];
    this.regex =
      /(正文){0,1}(第)([零〇一二三四五六七八九十百千万a-zA-Z0-9]{1,7})[章节卷集部篇回]((?! {4}).)((?!\t{1,4}).){0,30}\r?\n/g;

    this.loading = `
      <div class="d-flex justify-content-center" style="margin-top: 140px;">
        <div class="spinner-grow text-purple" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    `;
  }

  append(elem) {
    globals.$(`#${this.containerId}`).append(elem);
  }
  prepend(elem) {
    globals.$(`#${this.containerId}`).prepend(elem);
  }

  /**
   * 设置完整文本
   * @param {*} fullData 完整的文本信息
   */
  setData(fullData) {
    this.fullData = fullData;
    this.page = 0;
    this.maxPages = Math.ceil(this.fullData.length / this.textPerpage);
    this.maxWords = fullData.length;
  }
  setTOCData(tocData) {
    this.tocData = tocData;
  }

  getTOCData() {
    const data = this.fullData;
    const toc = [];
    const arr = data.match(this.regex);
    for (let index = 0; index < arr.length; index++) {
      const item = arr[index];
      const offset = data.search(item);
      const page = Math.ceil(offset / this.textPerpage);

      toc.push({ text: item.replace("\n", ""), page });
    }

    return toc;
  }

  buildTOC() {
    let toc = "";
    const binds = [];
    const arr = this.tocData;
    for (let index = 0; index < arr.length; index++) {
      const { text, page } = arr[index];
      const id = `paginator-toc-${index}`;
      toc += `<div id="${id}" class="paginator-toc-item limit-length">${text}</div>`;
      binds.push(() => {
        globals.$(`#${id}`).unbind("click");
        globals.$(`#${id}`).click(async () => {
          this.recover(page);
        });
      });
    }
    this.toc = toc;
    this.tocBinds = () => {
      for (let index = 0; index < binds.length; index++) {
        const func = binds[index];
        func();
      }
    };
  }

  getTOC() {
    return {
      html: this.toc,
      binds: this.tocBinds,
    };
  }

  getProgress(offsetPercentage) {
    if (this.maxPages === 0) return 0;
    return ((this.page + offsetPercentage / 100) / this.maxPages) * 100;
  }

  calcPage(method, recoverPage = 0) {
    let currPage = this.page;
    let stopRender = false;
    switch (method) {
      case "show":
        currPage = 0;
        break;

      case "prev":
        {
          const elem = globals.$(`[name="${this.slicePrefix}-pages"]`)[0];
          const page = parseInt(globals.$(elem).attr("data-page")) || 0;
          currPage = page;
          if (currPage > 0) {
            currPage = currPage - 1;
          } else {
            currPage = 0;
            stopRender = true;
          }
        }
        break;

      case "next":
        {
          const max = globals.$(`[name="${this.slicePrefix}-pages"]`).length;
          const elem = globals.$(`[name="${this.slicePrefix}-pages"]`)[max - 1];
          const page = parseInt(globals.$(elem).attr("data-page")) || 0;
          currPage = page;
          if (currPage < this.maxPages - 1) {
            currPage = currPage + 1;
          } else {
            currPage = currPage;
            stopRender = true;
          }
        }
        break;

      case "recover":
        currPage =
          recoverPage >= this.maxPages ? this.maxPages - 1 : recoverPage;
        break;

      default:
        break;
    }
    return { currPage, stopRender };
  }

  getTextByPage(currPage, nextPage) {
    const start = currPage * this.textPerpage || 0;
    const end = Math.max(1, nextPage) * this.textPerpage;
    const text = this.fullData.substring(start, end);
    return text;
  }

  /**
   * 从第0页开始显示
   */
  show() {
    const data = this.calcPage("show");
    this.page = data.currPage;
    this.readPage = data.currPage;
    return this.render(this.page, this.page + 1, "show");
  }

  /**
   * 前一页
   */
  renderPrevPage() {
    const data = this.calcPage("prev");
    this.page = data.currPage;
    if (data.stopRender) return null;
    return this.render(this.page, this.page + 1, "prev");
  }

  /**
   * 下一页
   */
  renderNextPage() {
    const data = this.calcPage("next");
    this.page = data.currPage;
    if (data.stopRender) return null;
    return this.render(this.page, this.page + 1, "next");
  }

  /**
   * 恢复到指定页
   */
  recover(page, readOffset = 0) {
    globals.$(`#${this.containerId}`).html("");
    const data = this.calcPage("recover", page);
    this.page = data.currPage;
    this.readOffset = readOffset;

    this.render(this.page, this.page + 1, "recover");

    return this.page;
  }

  /**
   * 渲染
   */
  render(currPage, nextPage, method) {
    const text = this.getTextByPage(currPage, nextPage);
    this.renderTxtArticleContent(text, {
      page: this.page,
      maxPage: this.maxPages,
      method,
    });
    return text;
  }

  /**
   * 渲染文本数据，加载到容器中
   * 超出this.maxLivePages的div将被销毁
   * @param {*} text
   * @param {*} pagination
   * @returns
   */
  renderTxtArticleContent(text, pagination = {}) {
    if (!text) return;
    // console.log(text, pagination);

    // 普通文本渲染
    const rendered = text
      .replace(/ /g, "&nbsp;")
      .replace(/[\n]|[\r\n]|[\r]/g, `<div style="margin-top:4px;"></div>`);

    const { page, method } = pagination;
    if (globals.$(`#render-txt-page-${page}`).length !== 0) {
      globals.$(`#render-txt-page-${page}`).html(rendered);
      return;
    }

    // 预加载：向前、向后
    // 清除超出阈值的页面：向前、向后
    const currPageId = `${this.slicePrefix}-page-${page}`;
    const elem = `
      <div name="${this.slicePrefix}-pages" data-page="${page}" id="${currPageId}">
        ${rendered}
      </div>
    `;
    switch (method) {
      case "show":
      case "next":
      case "recover":
        {
          this.append(elem);
        }
        break;

      case "prev":
        {
          this.prepend(elem);

          // 避免因渲染前一页导致阅读断层
          const element = document.getElementById(
            `${this.slicePrefix}-page-${page + 1}`
          );
          element.scrollIntoView(true);
        }
        break;

      default:
        break;
    }

    // 移除超出阈值的页面
    this.maintainLivePages(method);
  }

  maintainLivePages(method) {
    const length = globals.$(`[name="${this.slicePrefix}-pages"]`).length;
    if (length <= this.maxLivePages) return;

    if (method === "next") {
      // 移除最前面的一页
      globals.$(`[name="${this.slicePrefix}-pages"]`)[0].remove();
    } else if (method === "prev") {
      // 移除最后面的一页
      const max = globals.$(`[name="${this.slicePrefix}-pages"]`).length;
      const elem = globals.$(`[name="${this.slicePrefix}-pages"]`)[max - 1];
      elem.remove();
    }
  }

  updateProgress(top) {
    const elems = globals.$(`[name="${this.slicePrefix}-pages"]`);
    let offset = 0;
    let anchor = 0;
    let prev = 0;
    for (let index = 0; index < elems.length; index++) {
      const element = elems[index];
      const height = globals.$(element).height();
      prev = offset;
      offset += height;
      if (top < offset) {
        anchor = parseInt(globals.$(element).attr("data-page")) || 0;
        break;
      }
    }

    this.readPage = anchor;
    this.readOffset = top - prev;
  }
}
