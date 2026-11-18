window.__ModuleLoader__.load({
  id: 'dsh-model-insights',
  factory(require) {
    const React = require('react')
    const h = React.createElement

    /** Artificial Analysis snapshot, embedded at build time. */
    const AA = {"source":"https://artificialanalysis.ai/models","index":"Artificial Analysis Intelligence Index","snapshot":"2026-11-18","builtAt":"2026-11-18T02:32:01.766Z","count":68,"points":136,"layers":13,"models":[{"s":"claude-fable-5-2","n":"Claude Fable 5.2","w":1000000,"iq":[53.92,64.56],"gr":["S","B"],"p":1,"d":{"e":"max","i":64.56,"c":26.5386,"r":"S"},"pts":[{"e":"max","i":64.56,"c":26.5386,"t":2441.3,"r":"S","y":1},{"e":"xhigh","i":62.22,"c":14.8286,"t":1430.9,"r":"S","y":1},{"e":"high","i":61.82,"c":9.0784,"t":889.1,"r":"A","y":2},{"e":"medium","i":56.41,"c":3.8026,"t":381.6,"r":"B","y":3},{"e":"low","i":53.92,"c":3.0972,"t":320.1,"r":"B","y":3}]},{"s":"gpt-6-2-astra","n":"GPT-6.2 Astra","w":1000000,"iq":[45.65,62.14],"gr":["S","B"],"p":1,"d":{"e":"max","i":62.14,"c":3.9979,"r":"S"},"pts":[{"e":"max","i":62.14,"c":3.9979,"t":642.9,"r":"S","y":1},{"e":"xhigh","i":61.56,"c":2.5211,"t":371.4,"r":"S","y":1},{"e":"high","i":60.09,"c":2.0739,"t":293.6,"r":"S","y":1},{"e":"medium","i":57,"c":1.6177,"t":224.7,"r":"A","y":2},{"e":"low","i":45.65,"c":0.6617,"t":89.6,"r":"B","y":3}]},{"s":"gpt-6-2-sol","n":"GPT-6.2 Sol","w":1000000,"iq":[40.55,57.26],"gr":["S","S"],"p":1,"d":{"e":"max","i":57.26,"c":1.0144,"r":"S"},"pts":[{"e":"max","i":57.26,"c":1.0144,"t":473.8,"r":"S","y":1},{"e":"xhigh","i":55.74,"c":0.648,"t":303.1,"r":"S","y":1},{"e":"high","i":54.89,"c":0.5636,"t":254.2,"r":"S","y":1},{"e":"medium","i":52.68,"c":0.4061,"t":183.3,"r":"S","y":1},{"e":"low","i":40.55,"c":0.1836,"t":83.1,"r":"S","y":1}]},{"s":"gpt-6-1-sol","n":"GPT-6.1 Sol","w":1000000,"iq":[34.8,54.61],"gr":["S","A"],"p":1,"d":{"e":"max","i":54.61,"c":1.2721,"r":"A"},"pts":[{"e":"max","i":54.61,"c":1.2721,"t":1398,"r":"A","y":2},{"e":"xhigh","i":52.46,"c":0.764,"t":561.5,"r":"A","y":2},{"e":"high","i":50.33,"c":0.591,"t":444.9,"r":"A","y":2},{"e":"medium","i":46.35,"c":0.3594,"t":257.2,"r":"S","y":1},{"e":"low","i":34.8,"c":0.1615,"t":112.8,"r":"A","y":2}]},{"s":"gpt-6-1-terra","n":"GPT-6.1 Terra","w":1000000,"iq":[29.42,51.33],"gr":["S","B"],"p":1,"d":{"e":"max","i":51.33,"c":0.9611,"r":"B"},"pts":[{"e":"max","i":51.33,"c":0.9611,"t":852.1,"r":"B","y":3},{"e":"xhigh","i":45.25,"c":0.4007,"t":392.3,"r":"A","y":2},{"e":"high","i":42.43,"c":0.2593,"t":252.2,"r":"S","y":1},{"e":"medium","i":38.17,"c":0.1688,"t":168.6,"r":"S","y":1},{"e":"low","i":29.42,"c":0.0713,"t":71.9,"r":"S","y":1},{"e":null,"i":30.52,"c":0.2259,"t":149.3,"r":"B","y":3}]},{"s":"claude-haiku-5-5","n":"Claude Haiku 5.5","w":1000000,"iq":[18.62,36.48],"gr":["S","B"],"p":1,"d":{"e":"max","i":36.48,"c":0.411,"r":"B"},"pts":[{"e":"max","i":36.48,"c":0.411,"t":884.8,"r":"B","y":3},{"e":"xhigh","i":34.64,"c":0.2484,"t":577.2,"r":"B","y":3},{"e":"high","i":29.87,"c":0.1586,"t":388.1,"r":"A","y":2},{"e":"medium","i":24.6,"c":0.0918,"t":237.1,"r":"A","y":2},{"e":"low","i":18.62,"c":0.0438,"t":131.9,"r":"S","y":1}]},{"s":"muse-ember","n":"Muse Ember","w":1048576,"iq":[34.11,36.02],"gr":["S","S"],"p":1,"d":{"e":"max","i":36.02,"c":0.1359,"r":"S"},"pts":[{"e":"max","i":36.02,"c":0.1359,"t":186.8,"r":"S","y":1},{"e":"xhigh","i":34.11,"c":0.1162,"t":169.8,"r":"S","y":1}]},{"s":"gpt-6-luna","n":"GPT-6 Luna","w":1000000,"iq":[9.44,27.86],"gr":["S","C"],"p":1,"d":{"e":"max","i":27.86,"c":0.152,"r":"A"},"pts":[{"e":"max","i":27.86,"c":0.152,"t":726.4,"r":"A","y":2},{"e":"xhigh","i":23.45,"c":0.1041,"t":439.4,"r":"B","y":3},{"e":"high","i":21.43,"c":0.0729,"t":348,"r":"A","y":2},{"e":"medium","i":18.45,"c":0.0422,"t":207.8,"r":"S","y":1},{"e":"low","i":9.67,"c":0.0051,"t":37.3,"r":"A","y":2},{"e":null,"i":9.44,"c":0.0714,"t":109.4,"r":"C","y":4}]},{"s":"k2-horizon-375b-a23b","n":"K2 Horizon 375B A23B","w":524288,"iq":[17.82,17.82],"gr":["S","S"],"p":1,"d":{"e":"high","i":17.82,"c":0,"r":"S"},"pts":[{"e":"high","i":17.82,"c":0,"t":288.1,"r":"S","y":1}]},{"s":"gemini-4-carbon","n":"Gemini 4 Carbon","w":1000000,"iq":[54.22,60.03],"gr":["A","C"],"p":0,"d":{"e":"high","i":60.03,"c":5.4848,"r":"A"},"pts":[{"e":"high","i":60.03,"c":5.4848,"t":1989.3,"r":"A","y":2},{"e":"medium","i":58.26,"c":4.6777,"t":1756.6,"r":"A","y":2},{"e":"low","i":54.22,"c":5.2214,"t":1775.6,"r":"C","y":4}]},{"s":"mimo-v2-6-flash","n":"MiMo-V2.6-Flash","w":1000000,"iq":[26.73,26.73],"gr":["A","A"],"p":0,"d":{"e":null,"i":26.73,"c":0.1285,"r":"A"},"pts":[{"e":null,"i":26.73,"c":0.1285,"t":3279,"r":"A","y":2}]},{"s":"command-a-plus","n":"Command A+","w":192000,"iq":[6.24,6.24],"gr":["A","A"],"p":0,"d":{"e":null,"i":6.24,"c":0,"r":"A"},"pts":[{"e":null,"i":6.24,"c":0,"t":213.9,"r":"A","y":2}]},{"s":"claude-opus-5-5","n":"Claude Opus 5.5","w":1000000,"iq":[34.75,59.11],"gr":["B","D"],"p":0,"d":{"e":"max","i":59.11,"c":10.0364,"r":"B"},"pts":[{"e":"max","i":59.11,"c":10.0364,"t":1471.5,"r":"B","y":3},{"e":"xhigh","i":57.44,"c":6.0472,"t":937.8,"r":"B","y":3},{"e":"high","i":51.84,"c":3.4647,"t":556.5,"r":"D","y":5},{"e":"medium","i":48.21,"c":2.4511,"t":410.5,"r":"D","y":5},{"e":"low","i":34.75,"c":0.9755,"t":180.8,"r":"D","y":5}]},{"s":"gpt-6-astra","n":"GPT-6 Astra","w":1000000,"iq":[43.33,56.85],"gr":["B","C"],"p":0,"d":{"e":"max","i":56.85,"c":6.2447,"r":"C"},"pts":[{"e":"max","i":56.85,"c":6.2447,"t":1194.7,"r":"C","y":4},{"e":"xhigh","i":55.31,"c":3.6589,"t":610,"r":"B","y":3},{"e":"high","i":54.85,"c":3.2386,"t":526,"r":"B","y":3},{"e":"medium","i":51.55,"c":2.7324,"t":388.4,"r":"B","y":3},{"e":"low","i":43.33,"c":1.4237,"t":198.6,"r":"C","y":4}]},{"s":"inkling-small","n":"Inkling Small","w":1000000,"iq":[9.58,12.91],"gr":["B","C"],"p":0,"d":{"e":null,"i":12.91,"c":0.2032,"r":"C"},"pts":[{"e":"high","i":9.58,"c":0.0614,"t":null,"r":"B","y":3},{"e":null,"i":12.91,"c":0.2032,"t":403.7,"r":"C","y":4}]},{"s":"granite-4-2-8b","n":"Granite 4.2 8B","w":131072,"iq":[5.1,5.1],"gr":["B","B"],"p":0,"d":{"e":null,"i":5.1,"c":0.0405,"r":"B"},"pts":[{"e":null,"i":5.1,"c":0.0405,"t":660.5,"r":"B","y":3}]},{"s":"gemma-4-e4b","n":"Gemma 4 E4B","w":128000,"iq":[4.78,4.78],"gr":["B","B"],"p":0,"d":{"e":null,"i":4.78,"c":0.0083,"r":"B"},"pts":[{"e":null,"i":4.78,"c":0.0083,"t":247.2,"r":"B","y":3}]},{"s":"north-mini-code","n":"North Mini Code","w":256000,"iq":[3.42,3.42],"gr":["B","B"],"p":0,"d":{"e":null,"i":3.42,"c":0,"r":"B"},"pts":[{"e":null,"i":3.42,"c":0,"t":171.9,"r":"B","y":3}]},{"s":"gemini-4-hydrogen","n":"Gemini 4 Hydrogen","w":1000000,"iq":[26.89,53.92],"gr":["C","D"],"p":0,"d":{"e":"xhigh","i":53.92,"c":3.1602,"r":"C"},"pts":[{"e":"xhigh","i":53.92,"c":3.1602,"t":888.1,"r":"C","y":4},{"e":"high","i":50.79,"c":1.8733,"t":501.6,"r":"C","y":4},{"e":"medium","i":41.23,"c":0.798,"t":241.7,"r":"C","y":4},{"e":"low","i":26.89,"c":0.2922,"t":88.6,"r":"D","y":5}]},{"s":"deepseek-v4-1-flash-1017","n":"DeepSeek V4.1 Flash 1017","w":1000000,"iq":[18.51,32.59],"gr":["C","D"],"p":0,"d":{"e":"max","i":32.59,"c":0.6021,"r":"C"},"pts":[{"e":"max","i":32.59,"c":0.6021,"t":781.5,"r":"C","y":4},{"e":"high","i":28.64,"c":0.4562,"t":618.1,"r":"D","y":5},{"e":null,"i":18.51,"c":0.4254,"t":430.8,"r":"D","y":7}]},{"s":"mimo-v2-6-pro","n":"MiMo-V2.6-Pro","w":1000000,"iq":[29.89,29.89],"gr":["C","C"],"p":0,"d":{"e":null,"i":29.89,"c":0.2572,"r":"C"},"pts":[{"e":null,"i":29.89,"c":0.2572,"t":2086.1,"r":"C","y":4}]},{"s":"mistral-small-4","n":"Mistral Small 4","w":256000,"iq":[4.3,4.3],"gr":["C","C"],"p":0,"d":{"e":null,"i":4.3,"c":0.0399,"r":"C"},"pts":[{"e":null,"i":4.3,"c":0.0399,"t":102.1,"r":"C","y":4}]},{"s":"claude-sonnet-5-5","n":"Claude Sonnet 5.5","w":1000000,"iq":[25.65,54.54],"gr":["D","D"],"p":0,"d":{"e":"max","i":54.54,"c":10.0206,"r":"D"},"pts":[{"e":"max","i":54.54,"c":10.0206,"t":1939.8,"r":"D","y":5},{"e":"xhigh","i":49.92,"c":4.092,"t":852.6,"r":"D","y":6},{"e":"high","i":41.52,"c":1.6361,"t":406.5,"r":"D","y":5},{"e":"medium","i":30.82,"c":0.7807,"t":224.9,"r":"D","y":5},{"e":"low","i":25.65,"c":0.5113,"t":153.9,"r":"D","y":6}]},{"s":"gemini-4-argon","n":"Gemini 4 Argon","w":1000000,"iq":[47.6,50.41],"gr":["D","D"],"p":0,"d":{"e":"high","i":50.41,"c":4.9733,"r":"D"},"pts":[{"e":"high","i":50.41,"c":4.9733,"t":1747,"r":"D","y":6},{"e":"medium","i":47.6,"c":4.3146,"t":1681.3,"r":"D","y":7}]},{"s":"claude-fable-5-1","n":"Claude Fable 5.1","w":1000000,"iq":[38.68,50.02],"gr":["D","D"],"p":0,"d":{"e":"xhigh","i":50.02,"c":10.8475,"r":"D"},"pts":[{"e":"max","i":49.16,"c":12.994,"t":1269.8,"r":"D","y":8},{"e":"xhigh","i":50.02,"c":10.8475,"t":1167.8,"r":"D","y":7},{"e":"high","i":47.17,"c":7.54,"t":783.3,"r":"D","y":8},{"e":"medium","i":43.17,"c":5.5643,"t":572.7,"r":"D","y":8},{"e":"low","i":38.68,"c":4.4711,"t":449.3,"r":"D","y":8}]},{"s":"kimi-k3-1-pro","n":"Kimi K3.1 Pro","w":1000000,"iq":[46.45,46.45],"gr":["D","D"],"p":0,"d":{"e":"max","i":46.45,"c":3.6812,"r":"D"},"pts":[{"e":"max","i":46.45,"c":3.6812,"t":2297.2,"r":"D","y":6}]},{"s":"gpt-6-sol","n":"GPT-6 Sol","w":1050000,"iq":[44.16,44.16],"gr":["D","D"],"p":0,"d":{"e":"max","i":44.16,"c":2.4658,"r":"D"},"pts":[{"e":"max","i":44.16,"c":2.4658,"t":447.3,"r":"D","y":6}]},{"s":"claude-opus-5","n":"Claude Opus 5","w":1000000,"iq":[44.16,44.16],"gr":["D","D"],"p":0,"d":{"e":"max","i":44.16,"c":11.8215,"r":"D"},"pts":[{"e":"max","i":44.16,"c":11.8215,"t":1478.1,"r":"D","y":9}]},{"s":"muse-wonder","n":"Muse Wonder","w":1048576,"iq":[40.53,43.57],"gr":["D","D"],"p":0,"d":{"e":"max","i":43.57,"c":6.952,"r":"D"},"pts":[{"e":"max","i":43.57,"c":6.952,"t":802.7,"r":"D","y":8},{"e":"high","i":40.53,"c":4.5605,"t":523.9,"r":"D","y":8}]},{"s":"qwen4-max","n":"Qwen4 Max","w":983616,"iq":[42.89,42.89],"gr":["D","D"],"p":0,"d":{"e":"xhigh","i":42.89,"c":3.2681,"r":"D"},"pts":[{"e":"xhigh","i":42.89,"c":3.2681,"t":1988.5,"r":"D","y":7}]},{"s":"muse-spark-1-3","n":"Muse Spark 1.3","w":1000000,"iq":[36.62,36.62],"gr":["D","D"],"p":0,"d":{"e":"max","i":36.62,"c":2.3858,"r":"D"},"pts":[{"e":"max","i":36.62,"c":2.3858,"t":854.3,"r":"D","y":6}]},{"s":"grok-4-7","n":"Grok 4.7","w":500000,"iq":[31.13,35.49],"gr":["D","D"],"p":0,"d":{"e":"xhigh","i":35.49,"c":7.7715,"r":"D"},"pts":[{"e":"xhigh","i":35.49,"c":7.7715,"t":1451.4,"r":"D","y":9},{"e":"high","i":35.21,"c":6.1836,"t":1259.5,"r":"D","y":9},{"e":"low","i":31.13,"c":2.9222,"t":594.9,"r":"D","y":7}]},{"s":"tencent-hy4","n":"Tencent Hy4","w":1048576,"iq":[34.56,34.56],"gr":["D","D"],"p":0,"d":{"e":null,"i":34.56,"c":1.0311,"r":"D"},"pts":[{"e":null,"i":34.56,"c":1.0311,"t":813,"r":"D","y":6}]},{"s":"qwen3-8-max","n":"Qwen3.8 Max (0902)","w":983616,"iq":[33.65,33.65],"gr":["D","D"],"p":0,"d":{"e":"xhigh","i":33.65,"c":10.0239,"r":"D"},"pts":[{"e":"xhigh","i":33.65,"c":10.0239,"t":2847.3,"r":"D","y":10}]},{"s":"gpt-5-6-terra","n":"GPT-5.6 Terra","w":1000000,"iq":[32.34,32.34],"gr":["D","D"],"p":0,"d":{"e":"max","i":32.34,"c":3.7349,"r":"D"},"pts":[{"e":"max","i":32.34,"c":3.7349,"t":735,"r":"D","y":8}]},{"s":"glm-5-3","n":"GLM-5.3","w":1000000,"iq":[23.11,31.65],"gr":["D","D"],"p":0,"d":{"e":"max","i":31.65,"c":5.0093,"r":"D"},"pts":[{"e":"max","i":31.65,"c":5.0093,"t":1300.5,"r":"D","y":9},{"e":"low","i":23.11,"c":1.5749,"t":726.5,"r":"D","y":9}]},{"s":"grok-4-6","n":"Grok 4.6","w":500000,"iq":[31.03,31.03],"gr":["D","D"],"p":0,"d":{"e":"xhigh","i":31.03,"c":4.6786,"r":"D"},"pts":[{"e":"xhigh","i":31.03,"c":4.6786,"t":763.3,"r":"D","y":9}]},{"s":"gemini-3-8-flash","n":"Gemini 3.8 Flash","w":1000000,"iq":[30.08,30.85],"gr":["D","D"],"p":0,"d":{"e":"high","i":30.85,"c":7.766,"r":"D"},"pts":[{"e":"high","i":30.85,"c":7.766,"t":851.7,"r":"D","y":10},{"e":"medium","i":30.08,"c":6.2586,"t":682.4,"r":"D","y":10}]},{"s":"inkling-2-small","n":"Inkling 2 Small","w":1024000,"iq":[30.63,30.63],"gr":["D","D"],"p":0,"d":{"e":null,"i":30.63,"c":1.1784,"r":"D"},"pts":[{"e":null,"i":30.63,"c":1.1784,"t":1255.4,"r":"D","y":7}]},{"s":"ling-3-1-flash","n":"Ling 3.1 Flash 1019","w":1048576,"iq":[29.57,29.57],"gr":["D","D"],"p":0,"d":{"e":null,"i":29.57,"c":3.1851,"r":"D"},"pts":[{"e":null,"i":29.57,"c":3.1851,"t":null,"r":"D","y":8}]},{"s":"minimax-m3-1-flash","n":"MiniMax-M3.1-Flash","w":1000000,"iq":[29.06,29.06],"gr":["D","D"],"p":0,"d":{"e":"max","i":29.06,"c":0.491,"r":"D"},"pts":[{"e":"max","i":29.06,"c":0.491,"t":1053.9,"r":"D","y":5}]},{"s":"qwen3-8-flash-next","n":"Qwen3.8-Flash-Next","w":256000,"iq":[28.58,28.58],"gr":["D","D"],"p":0,"d":{"e":null,"i":28.58,"c":0.5694,"r":"D"},"pts":[{"e":null,"i":28.58,"c":0.5694,"t":1762.7,"r":"D","y":6}]},{"s":"step-5-preview","n":"Step 5 Preview","w":1000000,"iq":[28.53,28.53],"gr":["D","D"],"p":0,"d":{"e":null,"i":28.53,"c":2.3453,"r":"D"},"pts":[{"e":null,"i":28.53,"c":2.3453,"t":789.9,"r":"D","y":8}]},{"s":"glm-5-3-flash","n":"GLM-5.3-Flash","w":1000000,"iq":[27.8,27.8],"gr":["D","D"],"p":0,"d":{"e":"max","i":27.8,"c":0.5833,"r":"D"},"pts":[{"e":"max","i":27.8,"c":0.5833,"t":2296.7,"r":"D","y":7}]},{"s":"mistral-large-4","n":"Mistral Large 4","w":1000000,"iq":[23.13,26.12],"gr":["D","D"],"p":0,"d":{"e":"high","i":26.12,"c":2.0617,"r":"D"},"pts":[{"e":"high","i":26.12,"c":2.0617,"t":1125.7,"r":"D","y":8},{"e":"medium","i":23.13,"c":1.4121,"t":791.4,"r":"D","y":8}]},{"s":"mistral-large-4-preview","n":"Mistral Large 4 Preview","w":524288,"iq":[25.34,25.34],"gr":["D","D"],"p":0,"d":{"e":null,"i":25.34,"c":4.2089,"r":"D"},"pts":[{"e":null,"i":25.34,"c":4.2089,"t":1662.6,"r":"D","y":9}]},{"s":"muse-spark-open","n":"Muse Spark Open","w":1048576,"iq":[24.88,24.88],"gr":["D","D"],"p":0,"d":{"e":"xhigh","i":24.88,"c":2.0177,"r":"D"},"pts":[{"e":"xhigh","i":24.88,"c":2.0177,"t":350.5,"r":"D","y":8}]},{"s":"agnes-2-5-pro-theta","n":"Agnes 2.5 Pro Theta","w":1000000,"iq":[24.03,24.03],"gr":["D","D"],"p":0,"d":{"e":null,"i":24.03,"c":0.5747,"r":"D"},"pts":[{"e":null,"i":24.03,"c":0.5747,"t":1371.8,"r":"D","y":7}]},{"s":"gpt-5-6-luna","n":"GPT-5.6 Luna","w":1000000,"iq":[23.79,23.79],"gr":["D","D"],"p":0,"d":{"e":"max","i":23.79,"c":0.3313,"r":"D"},"pts":[{"e":"max","i":23.79,"c":0.3313,"t":585.1,"r":"D","y":6}]},{"s":"deepseek-v4-pro","n":"DeepSeek V4 Pro 0813","w":1000000,"iq":[12.57,23.06],"gr":["D","D"],"p":0,"d":{"e":"max","i":23.06,"c":1.7691,"r":"D"},"pts":[{"e":"max","i":23.06,"c":1.7691,"t":1015.2,"r":"D","y":10},{"e":"high","i":20.8,"c":0.8485,"t":null,"r":"D","y":8},{"e":null,"i":12.57,"c":0.977,"t":832.7,"r":"D","y":10}]},{"s":"qwen3-8-27b","n":"Qwen3.8 27B","w":256000,"iq":[10.03,20.11],"gr":["D","D"],"p":0,"d":{"e":"xhigh","i":20.11,"c":3.5295,"r":"D"},"pts":[{"e":"xhigh","i":20.11,"c":3.5295,"t":2283.6,"r":"D","y":11},{"e":"medium","i":17.48,"c":2.16,"t":1848.9,"r":"D","y":11},{"e":"low","i":15.69,"c":1.9059,"t":1656.5,"r":"D","y":11},{"e":null,"i":10.03,"c":3.7729,"t":1166.7,"r":"D","y":13}]},{"s":"minimax-m3","n":"MiniMax-M3","w":1000000,"iq":[18.88,18.88],"gr":["D","D"],"p":0,"d":{"e":null,"i":18.88,"c":1.2851,"r":"D"},"pts":[{"e":null,"i":18.88,"c":1.2851,"t":848.2,"r":"D","y":9}]},{"s":"reflection-beam","n":"Beam 1.0","w":1048576,"iq":[17.73,17.73],"gr":["D","D"],"p":0,"d":{"e":null,"i":17.73,"c":0.2844,"r":"D"},"pts":[{"e":null,"i":17.73,"c":0.2844,"t":130.1,"r":"D","y":5}]},{"s":"kimi-k3","n":"Kimi K3","w":1048576,"iq":[17.42,17.42],"gr":["D","D"],"p":0,"d":{"e":"low","i":17.42,"c":2.3688,"r":"D"},"pts":[{"e":"low","i":17.42,"c":2.3688,"t":955.1,"r":"D","y":12}]},{"s":"solar-pro-4","n":"Solar Pro 4","w":512000,"iq":[14.16,14.16],"gr":["D","D"],"p":0,"d":{"e":null,"i":14.16,"c":0.9557,"r":"D"},"pts":[{"e":null,"i":14.16,"c":0.9557,"t":4321.4,"r":"D","y":9}]},{"s":"apodex-1-1","n":"Apodex 1.1","w":256000,"iq":[13.67,13.67],"gr":["D","D"],"p":0,"d":{"e":null,"i":13.67,"c":0.7642,"r":"D"},"pts":[{"e":null,"i":13.67,"c":0.7642,"t":null,"r":"D","y":8}]},{"s":"nemotron-3-5-super-vl","n":"Nemotron 3.5 Super VL","w":1000000,"iq":[13.62,13.62],"gr":["D","D"],"p":0,"d":{"e":"high","i":13.62,"c":0.4818,"r":"D"},"pts":[{"e":"high","i":13.62,"c":0.4818,"t":320.6,"r":"D","y":8}]},{"s":"inkling","n":"Inkling","w":1000000,"iq":[11.03,12.48],"gr":["D","D"],"p":0,"d":{"e":"xhigh","i":12.48,"c":1.352,"r":"D"},"pts":[{"e":"xhigh","i":12.48,"c":1.352,"t":488.6,"r":"D","y":11},{"e":"high","i":11.03,"c":0.617,"t":null,"r":"D","y":9}]},{"s":"nemotron-3-ultra-550b-a55b","n":"Nemotron 3 Ultra 550B A55B","w":262144,"iq":[11.76,11.76],"gr":["D","D"],"p":0,"d":{"e":null,"i":11.76,"c":2.2103,"r":"D"},"pts":[{"e":null,"i":11.76,"c":2.2103,"t":263.8,"r":"D","y":12}]},{"s":"gemini-3-5-flash-lite","n":"Gemini 3.5 Flash-Lite","w":1000000,"iq":[11.66,11.66],"gr":["D","D"],"p":0,"d":{"e":"high","i":11.66,"c":0.6929,"r":"D"},"pts":[{"e":"high","i":11.66,"c":0.6929,"t":92.2,"r":"D","y":9}]},{"s":"claude-4-5-haiku","n":"Claude 4.5 Haiku","w":200000,"iq":[7.43,7.43],"gr":["D","D"],"p":0,"d":{"e":null,"i":7.43,"c":0.5318,"r":"D"},"pts":[{"e":null,"i":7.43,"c":0.5318,"t":225.8,"r":"D","y":9}]},{"s":"muse-glimmer","n":"Muse Glimmer","w":131072,"iq":[6.34,6.34],"gr":["D","D"],"p":0,"d":{"e":"high","i":6.34,"c":0.1782,"r":"D"},"pts":[{"e":"high","i":6.34,"c":0.1782,"t":280.7,"r":"D","y":5}]},{"s":"gemini-3-1-flash-lite","n":"Gemini 3.1 Flash-Lite","w":1000000,"iq":[6.16,6.16],"gr":["D","D"],"p":0,"d":{"e":"high","i":6.16,"c":0.1945,"r":"D"},"pts":[{"e":"high","i":6.16,"c":0.1945,"t":46.4,"r":"D","y":6}]},{"s":"lfm3-1-7b","n":"LFM3-1.7B","w":262144,"iq":[5.99,5.99],"gr":["D","D"],"p":0,"d":{"e":null,"i":5.99,"c":0.1732,"r":"D"},"pts":[{"e":null,"i":5.99,"c":0.1732,"t":null,"r":"D","y":5}]},{"s":"nemotron-3-5-lightning","n":"Nemotron 3.5 Lightning","w":1000000,"iq":[5.53,5.53],"gr":["D","D"],"p":0,"d":{"e":null,"i":5.53,"c":0.3145,"r":"D"},"pts":[{"e":null,"i":5.53,"c":0.3145,"t":235.1,"r":"D","y":7}]},{"s":"mistral-medium-3-5","n":"Mistral Medium 3.5","w":256000,"iq":[4.65,4.65],"gr":["D","D"],"p":0,"d":{"e":"high","i":4.65,"c":1.0391,"r":"D"},"pts":[{"e":"high","i":4.65,"c":1.0391,"t":270,"r":"D","y":11}]},{"s":"gpt-oss-120b","n":"gpt-oss-120b","w":131072,"iq":[3.82,3.82],"gr":["D","D"],"p":0,"d":{"e":"high","i":3.82,"c":0.3453,"r":"D"},"pts":[{"e":"high","i":3.82,"c":0.3453,"t":411.1,"r":"D","y":8}]},{"s":"lfm3-vl-2b","n":"LFM3-VL-2B","w":128000,"iq":[1.71,1.71],"gr":["D","D"],"p":0,"d":{"e":null,"i":1.71,"c":0.1237,"r":"D"},"pts":[{"e":null,"i":1.71,"c":0.1237,"t":null,"r":"D","y":5}]}]}

    const VARIANTS = new Set([
      'max', 'high', 'low', 'xhigh', 'medium', 'minimal', 'none',
      'default', 'fallback', 'reasoning', 'non', 'thinking', 'think',
      'preview', 'exp', 'experimental', 'turbo', 'instruct', 'chat',
      'latest', 'alpha', 'beta', 'rc', 'defaultfallback', 'hybrid',
      'highspeed', 'fast',
    ])

    const tokensOf = (text) =>
      String(text || '')
        .toLowerCase()
        .replace(/[^a-z0-9.]+/g, ' ')
        .trim()
        .split(' ')
        .filter(Boolean)
        .map((t) => t.replace(/\./g, ''))
        .filter((t) => t && !VARIANTS.has(t))

    const compactOf = (text) => tokensOf(text).join('')
    const NUMERIC = /^\d+$/

    const byKey = new Map()
    for (const row of AA.models) {
      const key = compactOf(row.n)
      if (key && !byKey.has(key)) byKey.set(key, row)
    }

    const byTokens = AA.models.map((row) => {
      const tokens = tokensOf(row.n)
      return { row, tokens, set: new Set(tokens) }
    })

    /**
     * Exact compact-name match first, then a guarded fuzzy pass: the query's
     * version numbers must all appear in the AA name, and only date-code-like
     * extras (>= 3 digits) are tolerated.
     */
    const lookup = (id, name) => {
      for (const key of [compactOf(name), compactOf(id)]) {
        if (key && byKey.has(key)) return byKey.get(key)
      }
      let best = null
      let bestScore = 0
      let bestExtra = Infinity
      for (const query of [tokensOf(name), tokensOf(id)]) {
        if (!query.length) continue
        const querySet = new Set(query)
        const queryNums = query.filter((t) => NUMERIC.test(t))
        for (const entry of byTokens) {
          if (!queryNums.every((n) => entry.set.has(n))) continue
          const extraNumbers = entry.tokens.filter((t) => NUMERIC.test(t) && !queryNums.includes(t))
          if (extraNumbers.some((n) => n.length < 3)) continue
          let shared = 0
          for (const token of querySet) if (entry.set.has(token)) shared++
          const coverage = shared / querySet.size
          const extra = entry.tokens.length - shared
          if (coverage > bestScore || (coverage === bestScore && extra < bestExtra)) {
            bestScore = coverage
            best = entry.row
            bestExtra = extra
          }
        }
      }
      return bestScore >= 0.8 ? best : null
    }

    const money = (value) => {
      if (value === null || value === undefined) return '—'
      if (value === 0) return '$0'
      return value < 0.01 ? '<$0.01' : '$' + value.toFixed(2)
    }

    /** Grade letters come from Pareto layers of the effort points. */
    const GRADE_COLOR = {
      S: 'var(--dsw-alias-state-success-primary)',
      A: 'var(--dsw-alias-brand-primary)',
      B: 'var(--dsw-alias-label-primary)',
      C: 'var(--dsw-alias-state-warn-primary)',
      D: 'var(--dsw-alias-state-error-primary)',
    }

    const pill = (children, options) =>
      h(
        'span',
        {
          title: options && options.title,
          style: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            marginInlineStart:
              options && options.marginInlineStart !== undefined ? options.marginInlineStart : 6,
            padding: '0 5px',
            height: 16,
            borderRadius: 8,
            border: '1px solid var(--dsw-alias-border-l1)',
            background: 'var(--dsw-alias-bg-layer-2)',
            color: options && options.color ? options.color : 'var(--dsw-alias-label-secondary)',
            fontSize: 10,
            lineHeight: '14px',
            fontWeight: 500,
            whiteSpace: 'nowrap',
            verticalAlign: 'middle',
            flex: 'none',
          },
        },
        children,
      )

    const readLabel = (t, key, fallback) => {
      try {
        const value = t(key)
        return value === key ? fallback : value
      } catch {
        return fallback
      }
    }

    const round = (value) => Math.round(value)
    const iqText = (row) =>
      row.iq[0] === row.iq[1] ? String(round(row.iq[1])) : `${round(row.iq[0])}–${round(row.iq[1])}`
    const gradeText = (row) => (row.gr[0] === row.gr[1] ? row.gr[0] : `${row.gr[0]}–${row.gr[1]}`)

    const effortLine = (point) =>
      [
        point.e || '—',
        'IQ ' + round(point.i),
        point.c === null || point.c === undefined ? null : money(point.c) + '/task',
        point.r || null,
      ]
        .filter(Boolean)
        .join(' · ')

    function makeBadge(t) {
      return function ModelInsightBadge(props) {
        const model = props && props.model
        if (!model) return null
        // This slot owns the label itself: the model name has to render here.
        const name = model.name || model.displayName || model.id || ''
        const label = h(
          'span',
          {
            key: 'name',
            style: {
              minWidth: 0,
              flex: '0 1 auto',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              color: 'inherit',
              fontSize: 'inherit',
              lineHeight: 'inherit',
              fontWeight: 'inherit',
            },
          },
          name,
        )
        const row = lookup(model.id, model.name)
        if (!row) return label

        // A row that names its effort (e.g. "GPT-6.2 Astra (max)") shows that
        // single point; otherwise the badge shows the whole range.
        const suffix = /\((max|xhigh|high|medium|low)\)/i.exec(name)
        const point = suffix ? row.pts.find((p) => (p.e || '').toLowerCase() === suffix[1].toLowerCase()) : null
        const view = point
          ? { ...row, iq: [point.i, point.i], gr: [point.r, point.r], p: point.y === 1 ? 1 : 0 }
          : row

        const isTrigger = props.placement === 'trigger'
        const title = [
          row.n,
          readLabel(t, 'badge.intelligence', 'Intelligence index') + ': ' + iqText(view),
          readLabel(t, 'badge.grade', 'Value grade') + ': ' + gradeText(view),
          '',
          ...row.pts.map((p) => effortLine(p)),
          '',
          AA.source + ' · ' + AA.snapshot,
        ].join('\n')

        return h(
          'span',
          {
            key: 'row',
            style: {
              display: 'flex',
              alignItems: 'center',
              minWidth: 0,
              maxWidth: '100%',
              flex: isTrigger ? '0 1 auto' : '1 1 auto',
              width: isTrigger ? 'auto' : '100%',
              gap: 6,
              color: 'inherit',
              fontSize: 'inherit',
              lineHeight: 'inherit',
            },
          },
          label,
          pill(
            [
              h('span', { key: 'iq' }, 'IQ ' + iqText(view)),
              h('span', { key: 'sep', style: { opacity: 0.45 } }, '·'),
              h(
                'span',
                {
                  key: 'grade',
                  title: readLabel(t, 'badge.grade', 'Value grade') + ': ' + gradeText(view),
                  style: {
                    fontWeight: 700,
                    color: GRADE_COLOR[view.gr[0]] || 'inherit',
                    letterSpacing: '0.02em',
                  },
                },
                gradeText(view),
              ),
              view.p
                ? h('span', { key: 'frontier', 'aria-hidden': true, style: { opacity: 0.75 } }, '◆')
                : null,
            ],
            { title, marginInlineStart: isTrigger ? 4 : 'auto' },
          ),
        )
      }
    }

    function makePanel(t) {
      const ROWS = 12
      const order = { S: 0, A: 1, B: 2, C: 3, D: 4 }
      return function ModelInsightPanel() {
        const [open, setOpen] = React.useState(false)
        const [mode, setMode] = React.useState('grade')
        const sorted = React.useMemo(() => {
          const rows = AA.models.filter((row) => row.pts && row.pts.length)
          if (mode === 'iq') return [...rows].sort((a, b) => b.iq[1] - a.iq[1])
          if (mode === 'cost') {
            const cheapest = (row) => Math.min(...row.pts.map((p) => (p.c === null ? Infinity : p.c)))
            return [...rows].sort((a, b) => cheapest(a) - cheapest(b))
          }
          return [...rows].sort((a, b) => order[a.gr[0]] - order[b.gr[0]] || b.iq[1] - a.iq[1])
        }, [mode])
        const frontier = React.useMemo(() => AA.models.filter((row) => row.p === 1), [])

        const tab = (key, labelText) =>
          h(
            'button',
            {
              key,
              type: 'button',
              onClick: (event) => {
                event.stopPropagation()
                setMode(key)
              },
              style: {
                border: 'none',
                background: mode === key ? 'var(--dsw-alias-bg-layer-2)' : 'transparent',
                color: 'var(--dsw-alias-label-primary)',
                fontSize: 11,
                padding: '2px 7px',
                borderRadius: 6,
                cursor: 'pointer',
              },
            },
            labelText,
          )

        return h(
          'div',
          { style: { padding: '2px 0 4px' } },
          h(
            'button',
            {
              type: 'button',
              'aria-expanded': open,
              onClick: (event) => {
                event.stopPropagation()
                setOpen(!open)
              },
              style: {
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                width: '100%',
                border: 'none',
                background: 'transparent',
                color: 'var(--dsw-alias-label-primary)',
                fontSize: 12,
                padding: '5px 8px',
                cursor: 'pointer',
                textAlign: 'start',
              },
            },
            h('span', { 'aria-hidden': true }, open ? '▾' : '▸'),
            h('span', null, readLabel(t, 'panel.title', 'AA intelligence vs cost')),
            h(
              'span',
              { style: { marginInlineStart: 'auto', fontSize: 10, opacity: 0.7 } },
              `${AA.models.length} models · ${AA.snapshot}`,
            ),
          ),
          open
            ? h(
                'div',
                { style: { padding: '2px 8px 6px' } },
                h(
                  'div',
                  { style: { display: 'flex', gap: 4, marginBottom: 4 } },
                  tab('grade', readLabel(t, 'panel.tabGrade', 'Grade')),
                  tab('iq', readLabel(t, 'panel.tabIq', 'Intelligence')),
                  tab('cost', readLabel(t, 'panel.tabCost', 'Cost')),
                ),
                h(
                  'div',
                  { style: { fontSize: 10, opacity: 0.65, marginBottom: 5, lineHeight: 1.4 } },
                  readLabel(
                    t,
                    'panel.hint',
                    'Grades are Pareto layers over every reasoning-effort point. A range means the model crosses grades as reasoning effort changes.',
                  ),
                ),
                h(
                  'div',
                  {
                    style: {
                      maxHeight: 240,
                      overflowY: 'auto',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 1,
                    },
                  },
                  sorted.slice(0, ROWS).map((row) =>
                    h(
                      'div',
                      {
                        key: row.s,
                        title: [row.n, ...row.pts.map(effortLine)].join('\n'),
                        style: {
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                          fontSize: 11,
                          padding: '2px 0',
                          color: 'var(--dsw-alias-label-primary)',
                        },
                      },
                      h(
                        'span',
                        {
                          style: {
                            flex: 1,
                            minWidth: 0,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          },
                        },
                        row.n,
                        row.p ? h('span', { style: { opacity: 0.7 } }, ' ◆') : null,
                      ),
                      h(
                        'span',
                        { style: { opacity: 0.75, flex: 'none', fontVariantNumeric: 'tabular-nums' } },
                        'IQ ' + iqText(row),
                      ),
                      h(
                        'span',
                        {
                          style: {
                            flex: 'none',
                            width: 34,
                            textAlign: 'end',
                            fontWeight: 700,
                            color: GRADE_COLOR[row.gr[0]] || 'var(--dsw-alias-label-secondary)',
                          },
                        },
                        gradeText(row),
                      ),
                    ),
                  ),
                ),
                frontier.length
                  ? h(
                      'div',
                      { style: { marginTop: 6, fontSize: 10, opacity: 0.65, lineHeight: 1.4 } },
                      readLabel(t, 'panel.frontier', 'Frontier picks') +
                        ': ' +
                        frontier
                          .slice()
                          .sort((a, b) => b.iq[1] - a.iq[1])
                          .slice(0, 5)
                          .map((row) => row.n + ' (' + iqText(row) + ')')
                          .join(' · '),
                    )
                  : null,
                h(
                  'div',
                  { style: { marginTop: 5, fontSize: 10, opacity: 0.55 } },
                  `${AA.points} effort points · ${AA.source}`,
                ),
              )
            : null,
        )
      }
    }

    return {
      inject: ['slots', 'locale'],
      apply(ctx) {
        const disposeEn = ctx.locale.register('model-insights', 'en', {
          'badge.intelligence': 'Intelligence index',
          'badge.grade': 'Value grade (S = Pareto frontier, then A-D)',
          'panel.title': 'AA intelligence vs cost',
          'panel.tabGrade': 'Grade',
          'panel.tabIq': 'Intelligence',
          'panel.tabCost': 'Cost',
          'panel.hint':
            'Grades are Pareto layers over every reasoning-effort point. A range means the model crosses grades as reasoning effort changes.',
          'panel.frontier': 'Frontier picks',
        })
        ctx.effect(() => disposeEn)

        const disposeZh = ctx.locale.register('model-insights', 'zh', {
          'badge.intelligence': '智力指数',
          'badge.grade': '性价比等级（S = 帕累托前沿）',
          'panel.title': 'AA 智力 vs 成本',
          'panel.tabGrade': '等级',
          'panel.tabIq': '智力',
          'panel.tabCost': '成本',
          'panel.hint': '等级按每个推理档的帕累托层计算。显示为区间说明该模型随推理强度变化会跨档。',
          'panel.frontier': '前沿推荐',
        })
        ctx.effect(() => disposeZh)

        const t = ctx.locale.bind('model-insights')
        const badge = makeBadge(t)
        const panel = makePanel(t)

        ctx.effect(() =>
          ctx.slots.inject('conversation.input.model.label', () =>
            ctx.slots.register({ name: 'conversation.input.model.label' }, badge),
          ),
        )

        ctx.effect(() =>
          ctx.slots.inject('conversation.input.model.options', () =>
            ctx.slots.register(
              { name: 'conversation.input.model.options', id: 'model-insights-panel', order: 20 },
              panel,
            ),
          ),
        )
      },
    }
  },
})
