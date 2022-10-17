class PageBaseClass {
  constructor(options = {}) {
    // eslint-disable-next-line no-undef
    this.globals = globals;
    // eslint-disable-next-line no-undef
    const Offcanvas = OffcanvasModalClass;

    this.containerId = `nav-home-panel`;
    this.homeId = "nav-home";

    this.singleAPPMode = options.singleAPPMode || false; // 独立app模式

    // Flags
    this.needRefresh = true;
    this.suspend = false;

    // Fields
    this.usernameField = `SERVER_ACCOUNT_NAME`;
    this.tokenField = `SERVER_PANEL_TOKEN`;

    // Datas
    this.token = window.localStorage.getItem(this.tokenField) || null;
    this.account = null;
    this.client = null;
    this.setToken(this.token);

    // Modals
    this.topModal = new Offcanvas(this.containerId);
    this.bottomModal = new Offcanvas(this.containerId);
  }

  /**
   * 重置标志位
   */
  reset() {
    this.suspend = true;
  }

  initComponent() {
    const panel = `
      <div class="main-panel" name="main-panels" id="${this.containerId}">
      </div>
    `;
    this.globals.$("#__components_list").append(panel);
  }

  async init() {
    if (this.singleAPPMode) {
      this.initComponent();
    }

    // Modals
    this.topModal.init();
    this.bottomModal.init();
  }

  async exit() {
    // 弹出框
    if (this.topModal.isActive()) {
      this.topModal.hide();
      return;
    }
    if (this.bottomModal.isActive()) {
      this.bottomModal.hide();
      return;
    }

    // 重置
    this.reset();

    this.needRefresh = true;
  }

  /**
   * 处理
   */
  async onProc() {
    if (this.suspend) return;

    setTimeout(async () => {
      await this.onProc();
    }, 5000);
  }

  setToken(token) {
    this.token = token;
    this.client = this.createClient({
      Authorization: `${this.token}`,
    });
  }

  buildQueries(quries = {}) {
    return Object.entries(quries || {}).reduce((temp, [key, value], index) => {
      const divider = index === 0 ? "?" : "&";
      return `${divider}${key}=${value}`;
    }, "");
  }

  createClient(headers = {}, options = {}) {
    const objects = Object.assign({}, { baseURL: this.api }, options);
    const request = this.globals.axios.create({
      headers,
      ...objects,
    });
    request.interceptors.response.use(
      res => {
        if (res.data?.errors) {
          return Promise.resolve({
            errors: res.data?.errors,
          });
        }
        if (res.status === 401) {
          return this.openLoginModal();
        }
        if (res.status >= 200 && res.status < 300) {
          return Promise.resolve({ data: res.data?.data || res.data });
        }
      },
      error => {
        const res = error.response;
        if (!res) {
          return Promise.resolve({
            errors: {
              status: 400,
              message: "Request Failed",
              details: error,
            },
          });
        }
        const message = res.data?.errors;
        return Promise.resolve({
          status: res.status,
          errors: message,
        });
      }
    );
    return request;
  }

  async show() {
    this.suspend = false;
    this.onProc();
    if (!this.needRefresh) {
      return;
    }
    this.needRefresh = true;

    const exitBtn = this.singleAPPMode
      ? `
        <span id="${this.containerId}-appinfo-btn" class="float-end hover-text" style="font-size: 1.2em; margin-top: 2px;">
          <i class="fa-solid fa-circle-info"></i> 
        </span>
      `
      : `<span id="${this.containerId}-exit-btn" class="float-end" style="font-size: 1.2em; margin-top: 2px;">
          <i class="fa-solid fa-xmark"></i>
        </span>`;
    const panel = `
      <div>
        <span style="font-size: 0.7em; font-weight: 600;">
          林晓州
          <span class="small-text">linxiaozhou.com</span>
        </span>
        ${exitBtn}
        <div style="font-size: 0.6em; font-weight: 600; color: #888;">©Designed by linxiaozhou.com</div>
      </div>

      <div style="margin-top: 20px; margin-bottom: 40px;"> 
        <div class="small-text" style="text-align: center;">
          <i class="fa-solid fa-circle-info"></i> 到底啦~
        </div>
      </div>
    `;
    this.globals.$(`#${this.containerId}`).html(panel);

    // 退出按钮
    this.globals.bindClick(`${this.containerId}-exit-btn`, async () => {
      await this.exit();
    });

    // APP详情（仅APP模式有效）
    this.globals.bindClick(`${this.containerId}-appinfo-btn`, () => {
      this.openAPPInfoModal();
    });
  }

  /**
   * 打开APP信息面板
   */
  openAPPInfoModal() {
    const panel = `
        <div style="padding: 10px 20px; margin-top: 40px;">
          <div class="row">
            <div class="col-2">
              <img src="./images/test.png" class="float-end" style="height: 50px; border-radius: 8px;" />
            </div>
            <div class="col-10">
              <div>林晓州 <span class="small-text">linxiaozhou.com</span></div>
              <div class="small-text">©Designed by linxiaozhou.com</div>
            </div>
          </div>
        </div>
      `;
    this.bottomModal.show(panel, null, { height: "180px" });
  }
}
