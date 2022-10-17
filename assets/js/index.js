/* eslint-disable no-undef */

const globals = new GlobalToolsClass();
globals.setGlobal("dayjs", dayjs);
globals.setGlobal("bootstrap", bootstrap);
globals.setGlobal("marked", marked);
globals.setGlobal("axios", axios);

const HomeInst = new HomePageClass({ singleAPPMode: true });

// 初始化
$(document).ready(async function () {
  HomeInst.init();
  await HomeInst.show();
});
