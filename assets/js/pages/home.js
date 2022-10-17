// eslint-disable-next-line no-undef
class HomePageClass extends PageBaseClass {
  constructor(options = {}) {
    super(options);

    // Endpoints
    this.blogEndpoint = "https://linxiaozhou.com/blog";
    this.acountsEndpoint = "https://linxiaozhou.com/accounts";
  }

  async getLatestArticles() {
    const url = `${this.blogEndpoint}/square${this.buildQueries({ limit: 200 })}`;
    const res = await this.client.get(url);
    console.log(res);
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

    await Promise.allSettled([this.getLatestArticles()]);

    // 退出按钮
    this.globals.bindClick(`${this.containerId}-exit-btn`, async () => {
      await this.exit();
    });

    // APP详情（仅APP模式有效）
    this.globals.bindClick(`${this.containerId}-appinfo-btn`, () => {
      this.openAPPInfoModal();
    });
  }
}
