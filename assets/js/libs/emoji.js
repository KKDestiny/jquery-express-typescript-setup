const EMOJI_Tools = (() => {
  const EMOJI_P1 = `๐๐๐๐๐๐๐๐๐๐๐๐๐๐๐๐โบ๐๐๐๐ถ๐๐ฃ๐ฅ๐ฎ๐ฏ๐ช๐ซ๐ด๐๐๐๐๐๐๐๐๐ฒ๐ท๐๐๐๐ค๐ข๐ญ๐ฆ๐ง๐จ๐ฌ๐ฐ๐ฑ๐ณ๐ต๐ก๐ ๐๐ฟ๐น๐บ๐๐ป๐ฝ๐ฆ๐ง๐จ๐ฉ๐ด๐ต๐ถ๐ฑ๐ฎ๐ฒ๐ณ๐ท๐ธ๐๐๐ฐ๐ผ๐๐๐๐๐๐๐๐๐๐๐๐ค๐ฅ๐ถ๐๐ฏ๐๐ซ๐ฌ๐ญ๐๐๐ช๐ช๐๐โ๐๐โโ๐๐๐โ๐๐๐๐โ๐ฃ๐๐๐๐๐๐๐๐๐๐๐๐๐๐๐๐๐๐๐ผ๐๐๐ ๐ก๐ข๐๐๐ฉ๐๐๐๐๐`;
  const EMOJI_P2 = `๐น๐๐๐ฐ๐ฑ๐๐๐๐๐ท๐๐ช๐ซ๐โฝโก๐๐๐ฅ๐ช๐ญ๐จ๐ฐ๐ฃ๐๐ซ๐โฝโพ๐๐๐๐พ๐ฑ๐ณโณ๐ฃ๐ฝ๐ฟ๐๐๐๐๐ด๐ต๐ฏ๐ฎ๐ฒ๐ท๐ธ๐บ๐ป๐ฌ๐พ๐๐ป๐ ๐ก๐ข๐ฃ๐ค๐ฅ๐ฆ๐จ๐ฉ๐ช๐ซ๐ฌ๐ญ๐ฏ๐ฐ๐๐ผ๐ฝโชโฒ๐๐๐๐๐๐๐ ๐ก๐ข๐๐๐๐๐ช๐๐ช๐ฝ๐ฟ๐โโณโโฐ๐๐๐๐๐๐๐๐๐ฏ๐๐๐๐๐๐จ๐ซ๐ง๐ฉ๐๐๐๐ฌ๐ฎ๐ฉ๐๐ฆ๐จ๐ฃโ โ โฅโฆโฃ๐๐ด๐๐๐๐๐ข๐ฃ๐ค๐ข๐ฌ๐ญโจ๐๐๐โกโ๐ฏ๐๐ฐ๐ฑโญโโโโโโโโโโฐโฟใฝโณโดโโผโโโโโยฉยฎโข๐ฆ๐๐๐ฏ๐ ๐ก๐ข๐ฃ๐ค๐ฐ๐๐ฑ๐๐๐โน๐โ๐๐๐พ๐๐ฟ๐๐๐๐๐๐ท๐ถ๐ฏ๐๐น๐๐ฒ๐๐ธ๐ด๐ณใใ๐บ๐ตโชโซโปโผโฝโพโฌโฌ๐ถ๐ท๐ธ๐น๐บ๐ป๐ ๐ฒ๐ณโชโซ๐ด๐ตโโโโโโโโโโโโโ๐โค๐๐๐๐๐๐๐๐๐๐๐๐โฃ๐ฟ๐ง๐โ๐๐ฝโฌโโกโโฌโโฌโโโโฉโชโคดโคต๐๐๐๐๐๐๐๐๐๐โถโฉโโช๐ผโซ๐ฝโฌ๐ฑ๐ถ๐ณ๐ดโป๐ง๐ฎ๐ฐโฟ๐น๐บ๐ป๐ผ๐พโ ๐ธโ๐ซ๐ณ๐ญ๐ฏ๐ฑ๐ท๐`;

  const EMOJI_TRAFFIC = `๐๐๐๐๐๐๐๐๐๐๐๐๐๐๐๐๐๐๐๐๐๐๐๐๐๐๐๐๐ฒโฝ๐จ๐ฅ๐ฆ๐งโโต๐ค๐ขโ๐บ๐๐๐ ๐ก๐๐๐ฟ๐๐`;
  const EMOJI_OFFICE = `๐ป๐ฑ๐ฒโ๐๐๐ ๐๐๐ป๐ฝ๐พ๐ฟ๐๐ฅ๐บ๐ท๐น๐ผ๐๐๐ฌ๐ญ๐ก๐ก๐ฆ๐ฎ๐๐๐๐๐๐๐๐๐๐๐๐ฐ๐๐๐ฐ๐ด๐ต๐ถ๐ท๐ธ๐ณโ๐ง๐จ๐ฉ๐ค๐ฅ๐ฆ๐ซ๐ช๐ฌ๐ญ๐ฎโโ๐๐๐๐๐๐๐๐๐๐๐๐๐๐๐โ`;
  const EMOJI_PLANTS = `๐๐ธ๐ฎ๐น๐บ๐ป๐ผ๐ท๐ฑ๐ฒ๐ณ๐ด๐ต๐พ๐ฟ๐๐๐๐๐๐ฉ`;
  const EMOJI_ANIMALS = `๐๐๐๐ต๐๐ถ๐๐ฉ๐บ๐ฑ๐บ๐ธ๐น๐ป๐ผ๐ฝ๐๐ฟ๐พ๐๐ฏ๐๐๐ด๐๐ฎ๐๐๐๐ท๐๐๐ฝ๐๐๐๐ช๐ซ๐๐ญ๐๐๐น๐ฐ๐๐ป๐จ๐ผ๐พ๐๐๐ฃ๐ค๐ฅ๐ฆ๐ง๐ธ๐๐ข๐๐ฒ๐๐ณ๐๐ฌ๐๐ ๐ก๐๐๐๐๐๐๐๐ฆ`;
  const EMOJI_LABELS = `๐ด๐ ๐ก๐ข๐ต๐ฃ๐คโซโช๐ฅ๐ง๐จ๐ฉ๐ฆ๐ช๐ซโฌโฌ`;
  const EMOJI_FOODS = `๐๐๐๐๐๐๐๐ฅญ๐๐๐๐๐๐๐ซ๐ฅ๐๐ซ๐ฅฅ๐ฅ๐๐ฅ๐ฅ๐ฝ๐ถ๏ธ๐ซ๐ฅ๐ฅฌ๐ฅฆ๐ง๐ง๐๐ฅ๐ฐ๐๐ฅ๐ฅ๐ซ๐ฅจ๐ฅฏ๐ฅ๐ง๐ง๐๐๐ฅฉ๐ฅ๐๐๐๐ญ๐ฅช๐ฎ๐ฏ๐ซ๐ฅ๐ง๐ฅ๐ณ๐ฅ๐ฒ๐ซ๐ฅฃ๐ฅ๐ฟ๐ง๐ง๐ฅซ๐ฑ๐๐๐๐๐๐๐ ๐ข๐ฃ๐ค๐ฅ๐ฅฎ๐ก๐ฅ๐ฅ ๐ฅก๐ฆช๐ฆ๐ง๐จ๐ฉ๐ช๐๐ฐ๐ง๐ฅง๐ซ๐ฌ๐ญ๐ฎ๐ฏ๐ผ๐ฅโ๐ซ๐ต๐ถ๐พ๐ท๐ธ๐น๐บ๐ป๐ฅ๐ฅ๐ฅค๐ง๐ง๐ง๐ง๐ฅข๐ฝ๏ธ๐ด๐ฅ`;
  const EMONI_WEATHERS = `๐๐๐๐๐ชจ๐๐๐๐๐๐๐๐๐๐๐๐โ๏ธ๐๐โญ๐๐ โ๏ธโโ๏ธ๐ค๏ธ๐ฅ๏ธ๐ฆ๏ธ๐ง๏ธ๐จ๏ธ๐ฉ๏ธ๐ช๏ธ๐ซ๏ธ๐ฌ๏ธ๐โ๏ธโโกโ๏ธโ๏ธโโ๏ธ๐ฅ๐ง`;

  const renderIcons = (_texts) => {
    const texts = Array.from(_texts);
    let list = "";
    for (let index = 0; index < texts.length; index++) {
      const elem = texts[index];
      const curr = `<div onclick="EMOJI_Tools.input('${elem}')" class="emoji-icon">${elem}</div>`;
      list += curr;
    }
    return list;
  };
  let emojiInputFunc = null;
  const modal = `
    <div
      class="modal fade"
      id="input-emoji-modal"
      tabindex="-1"
      aria-labelledby="input-emoji-modalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content inverse" style="margin-top: 100px">
          <div class="modal-body">
            <div class="d-flex align-items-start">
              <ul class="nav flex-column nav-pills mb-3" id="pills-tab" role="tablist">
                <li class="nav-item" role="presentation" style="width: 90px;">
                  <button class="nav-link active" id="emoji-pills-home-tab" data-bs-toggle="pill" data-bs-target="#emoji-pills-home" type="button" role="tab" aria-controls="emoji-pills-home" aria-selected="true">๐ ่กจๆ</button>
                </li>
                <li class="nav-item" role="presentation">
                  <button class="nav-link" id="emoji-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#emoji-pills-profile" type="button" role="tab" aria-controls="emoji-pills-profile" aria-selected="false">๐ช ๅธธ็จ</button>
                </li>

                <li class="nav-item" role="presentation">
                  <button class="nav-link" id="emoji-part-1-tab" data-bs-toggle="pill" data-bs-target="#emoji-part-1" type="button" role="tab" aria-controls="emoji-part-1" aria-selected="false">๐ ๅบ่ก</button>
                </li>
                <li class="nav-item" role="presentation">
                  <button class="nav-link" id="emoji-part-2-tab" data-bs-toggle="pill" data-bs-target="#emoji-part-2" type="button" role="tab" aria-controls="emoji-part-2" aria-selected="false">๐ป ๅๅฌ</button>
                </li>
                <li class="nav-item" role="presentation">
                  <button class="nav-link" id="emoji-part-3-tab" data-bs-toggle="pill" data-bs-target="#emoji-part-3" type="button" role="tab" aria-controls="emoji-part-3" aria-selected="false">๐บ ๆค็ฉ</button>
                </li>
                <li class="nav-item" role="presentation">
                  <button class="nav-link" id="emoji-part-4-tab" data-bs-toggle="pill" data-bs-target="#emoji-part-4" type="button" role="tab" aria-controls="emoji-part-4" aria-selected="false">๐ผ ๅจ็ฉ</button>
                </li>
                <li class="nav-item" role="presentation">
                  <button class="nav-link" id="emoji-part-5-tab" data-bs-toggle="pill" data-bs-target="#emoji-part-5" type="button" role="tab" aria-controls="emoji-part-5" aria-selected="false">๐ด ๆ ็ญพ</button>
                </li>
                <li class="nav-item" role="presentation">
                  <button class="nav-link" id="emoji-part-6-tab" data-bs-toggle="pill" data-bs-target="#emoji-part-6" type="button" role="tab" aria-controls="emoji-part-6" aria-selected="false">๐ ้ฃ็ฉ</button>
                </li>
                <li class="nav-item" role="presentation">
                  <button class="nav-link" id="emoji-part-7-tab" data-bs-toggle="pill" data-bs-target="#emoji-part-7" type="button" role="tab" aria-controls="emoji-part-7" aria-selected="false">๐ ๅคฉๆฐ</button>
                </li>
              </ul>

              <div class="tab-content" style="height: 340px; overflow-y:auto;" id="pills-tabContent">
                <div class="tab-pane fade show active" id="emoji-pills-home" role="tabpanel" aria-labelledby="emoji-pills-home-tab">${renderIcons(
                  EMOJI_P1
                )}</div>
                <div class="tab-pane fade" id="emoji-pills-profile" role="tabpanel" aria-labelledby="emoji-pills-profile-tab">${renderIcons(
                  EMOJI_P2
                )}</div>
                
                <div class="tab-pane fade" id="emoji-part-1" role="tabpanel" aria-labelledby="emoji-part-1-tab">${renderIcons(
                  EMOJI_TRAFFIC
                )}</div>
                <div class="tab-pane fade" id="emoji-part-2" role="tabpanel" aria-labelledby="emoji-part-2-tab">${renderIcons(
                  EMOJI_OFFICE
                )}</div>
                <div class="tab-pane fade" id="emoji-part-3" role="tabpanel" aria-labelledby="emoji-part-3-tab">${renderIcons(
                  EMOJI_PLANTS
                )}</div>
                <div class="tab-pane fade" id="emoji-part-4" role="tabpanel" aria-labelledby="emoji-part-4-tab">${renderIcons(
                  EMOJI_ANIMALS
                )}</div>
                <div class="tab-pane fade" id="emoji-part-5" role="tabpanel" aria-labelledby="emoji-part-5-tab">${renderIcons(
                  EMOJI_LABELS
                )}</div>
                <div class="tab-pane fade" id="emoji-part-6" role="tabpanel" aria-labelledby="emoji-part-6-tab">${renderIcons(
                  EMOJI_FOODS
                )}</div>
                <div class="tab-pane fade" id="emoji-part-7" role="tabpanel" aria-labelledby="emoji-part-7-tab">${renderIcons(
                  EMONI_WEATHERS
                )}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
  $("#input-emoji-modal").remove(0);
  $("body").after(modal);

  const emojiModal = new bootstrap.Modal(
    document.getElementById("input-emoji-modal"),
    {
      keyboard: false,
    }
  );

  return {
    callToolbox() {
      emojiModal.show();
    },
    bindInputAction(action) {
      emojiInputFunc = action;
    },
    unbindInputAction() {
      emojiInputFunc = null;
    },
    input(elem) {
      if (typeof emojiInputFunc === "function") {
        return emojiInputFunc("emoji-input", elem);
      }
      console.log(elem);
    },
  };
})();
