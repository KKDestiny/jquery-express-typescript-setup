const EMOJI_Tools = (() => {
  const EMOJI_P1 = `😀😁😂😃😄😅😆😉😊😋😎😍😘😗😙😚☺😇😐😑😶😏😣😥😮😯😪😫😴😌😛😜😝😒😓😔😕😲😷😖😞😟😤😢😭😦😧😨😬😰😱😳😵😡😠😈👿👹👺💀👻👽👦👧👨👩👴👵👶👱👮👲👳👷👸💂🎅👰👼💆💇🙍🙎🙅🙆💁🙋🙇🙌🙏👤👥🚶🏃👯💃👫👬👭💏💑👪💪👈👉☝👆👇✌✋👌👍👎✊👊👋👏👐✍👣👀👂👃👅👄💋👓👔👕👖👗👘👙👚👛👜👝🎒💼👞👟👠👡👢👑👒🎩🎓💄💅💍🌂`;
  const EMOJI_P2 = `🌹🍀🍎💰📱🌙🍁🍂🍃🌷💎🔪🔫🏀⚽⚡👄👍🔥🎪🎭🎨🎰🚣🛀🎫🏆⚽⚾🏀🏈🏉🎾🎱🎳⛳🎣🎽🎿🏂🏄🏇🏊🚴🚵🎯🎮🎲🎷🎸🎺🎻🎬👾🌋🗻🏠🏡🏢🏣🏤🏥🏦🏨🏩🏪🏫🏬🏭🏯🏰💒🗼🗽⛪⛲🌁🌃🌆🌇🌉🌌🎠🎡🎢🛄🛅💌💎🔪💈🚪🚽🚿🛁⌛⏳⌚⏰🎈🎉🎊🎎🎏🎐🎀🎁📯🔒🔓🔏🔐🔑🔨🔫🔧🔩🔗💉💊🚬🔮🚩🎌💦💨💣☠♠♥♦♣🀄🎴🔇🔈🔉🔊📢📣💤💢💬💭♨🌀🔔🔕✡✝🔯📛🔰🔱⭕✅☑✔✖❌❎➕➖➗➰➿〽✳✴❇‼⁉❓❔❕❗©®™🎦🔅🔆💯🔠🔡🔢🔣🔤🅰🆎🅱🆑🆒🆓ℹ🆔Ⓜ🆕🆖🅾🆗🅿🆘🆙🆚🈁🈂🈷🈶🈯🉐🈹🈚🈲🉑🈸🈴🈳㊗㊙🈺🈵▪▫◻◼◽◾⬛⬜🔶🔷🔸🔹🔺🔻💠🔲🔳⚪⚫🔴🔵♈♉♊♋♌♍♎♏♐♑♒♓⛎💘❤💓💔💕💖💗💙💚💛💜💝💞💟❣🌿🚧💒☎📟💽⬆↗➡↘⬇↙⬅↖↕↔↩↪⤴⤵🔃🔄🔙🔚🔛🔜🔝🔀🔁🔂▶⏩◀⏪🔼⏫🔽⏬📱📶📳📴♻🏧🚮🚰♿🚹🚺🚻🚼🚾⚠🚸⛔🚫🚳🚭🚯🚱🚷🔞`;

  const EMOJI_TRAFFIC = `🚂🚃🚄🚅🚆🚇🚈🚉🚊🚝🚞🚋🚌🚍🚎🚏🚐🚑🚒🚓🚔🚕🚖🚗🚘🚚🚛🚜🚲⛽🚨🚥🚦🚧⚓⛵🚤🚢✈💺🚁🚟🚠🚡🚀🎑🗿🛂🛃`;
  const EMOJI_OFFICE = `📻📱📲☎📞📟📠🔋🔌💻💽💾💿📀🎥📺📷📹📼🔍🔎🔬🔭📡💡🔦🏮📔📕📖📗📘📙📚📓📃📜📄📰📑🔖💰💴💵💶💷💸💳✉📧📨📩📤📥📦📫📪📬📭📮✏✒📝📁📂📅📆📇📈📉📊📋📌📍📎📏📐✂`;
  const EMOJI_PLANTS = `💐🌸💮🌹🌺🌻🌼🌷🌱🌲🌳🌴🌵🌾🌿🍀🍁🍂🍃🌊💩`;
  const EMOJI_ANIMALS = `🙈🙉🙊🐵🐒🐶🐕🐩🐺🐱😺😸😹😻😼😽🙀😿😾🐈🐯🐅🐆🐴🐎🐮🐂🐃🐄🐷🐖🐗🐽🐏🐑🐐🐪🐫🐘🐭🐁🐀🐹🐰🐇🐻🐨🐼🐾🐔🐓🐣🐤🐥🐦🐧🐸🐊🐢🐍🐲🐉🐳🐋🐬🐟🐠🐡🐙🐚🐌🐛🐜🐝🐞🦋`;
  const EMOJI_LABELS = `🔴🟠🟡🟢🔵🟣🟤⚫⚪🟥🟧🟨🟩🟦🟪🟫⬛⬜`;
  const EMOJI_FOODS = `🍇🍈🍉🍊🍋🍌🍍🥭🍎🍏🍐🍑🍒🍓🫐🥝🍅🫒🥥🥑🍆🥔🥕🌽🌶️🫑🥒🥬🥦🧄🧅🍄🥜🌰🍞🥐🥖🫓🥨🥯🥞🧇🧀🍖🍗🥩🥓🍔🍟🍕🌭🥪🌮🌯🫔🥙🧆🥚🍳🥘🍲🫕🥣🥗🍿🧈🧂🥫🍱🍘🍙🍚🍛🍜🍝🍠🍢🍣🍤🍥🥮🍡🥟🥠🥡🦪🍦🍧🍨🍩🍪🎂🍰🧁🥧🍫🍬🍭🍮🍯🍼🥛☕🫖🍵🍶🍾🍷🍸🍹🍺🍻🥂🥃🥤🧋🧃🧉🧊🥢🍽️🍴🥄`;
  const EMONI_WEATHERS = `🌍🌎🌏🌐🪨🌑🌒🌓🌔🌕🌖🌗🌘🌙🌚🌛🌜☀️🌝🌞⭐🌟🌠☁️⛅⛈️🌤️🌥️🌦️🌧️🌨️🌩️🌪️🌫️🌬️🌈☂️☔⚡❄️☃️⛄☄️🔥💧`;

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
                  <button class="nav-link active" id="emoji-pills-home-tab" data-bs-toggle="pill" data-bs-target="#emoji-pills-home" type="button" role="tab" aria-controls="emoji-pills-home" aria-selected="true">😀 表情</button>
                </li>
                <li class="nav-item" role="presentation">
                  <button class="nav-link" id="emoji-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#emoji-pills-profile" type="button" role="tab" aria-controls="emoji-pills-profile" aria-selected="false">🎪 常用</button>
                </li>

                <li class="nav-item" role="presentation">
                  <button class="nav-link" id="emoji-part-1-tab" data-bs-toggle="pill" data-bs-target="#emoji-part-1" type="button" role="tab" aria-controls="emoji-part-1" aria-selected="false">🚝 出行</button>
                </li>
                <li class="nav-item" role="presentation">
                  <button class="nav-link" id="emoji-part-2-tab" data-bs-toggle="pill" data-bs-target="#emoji-part-2" type="button" role="tab" aria-controls="emoji-part-2" aria-selected="false">💻 办公</button>
                </li>
                <li class="nav-item" role="presentation">
                  <button class="nav-link" id="emoji-part-3-tab" data-bs-toggle="pill" data-bs-target="#emoji-part-3" type="button" role="tab" aria-controls="emoji-part-3" aria-selected="false">🌺 植物</button>
                </li>
                <li class="nav-item" role="presentation">
                  <button class="nav-link" id="emoji-part-4-tab" data-bs-toggle="pill" data-bs-target="#emoji-part-4" type="button" role="tab" aria-controls="emoji-part-4" aria-selected="false">😼 动物</button>
                </li>
                <li class="nav-item" role="presentation">
                  <button class="nav-link" id="emoji-part-5-tab" data-bs-toggle="pill" data-bs-target="#emoji-part-5" type="button" role="tab" aria-controls="emoji-part-5" aria-selected="false">🔴 标签</button>
                </li>
                <li class="nav-item" role="presentation">
                  <button class="nav-link" id="emoji-part-6-tab" data-bs-toggle="pill" data-bs-target="#emoji-part-6" type="button" role="tab" aria-controls="emoji-part-6" aria-selected="false">🍎 食物</button>
                </li>
                <li class="nav-item" role="presentation">
                  <button class="nav-link" id="emoji-part-7-tab" data-bs-toggle="pill" data-bs-target="#emoji-part-7" type="button" role="tab" aria-controls="emoji-part-7" aria-selected="false">🌞 天气</button>
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
