// 555 فاریور آٹوز — Full React Conversion
// Drop this file as src/App.jsx in a Vite React project
// Install: npm create vite@latest my-app -- --template react
// Then: npm install firebase

import { useState, useEffect, useRef, useCallback } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// ─── Firebase ────────────────────────────────────────────────────────────────
const firebaseApp = initializeApp({
  apiKey: "AIzaSyCPZWbVw4XiCjm5n-GbyKuLiYwbmrPCzs0",
  authDomain: "miannazikfareedawan.firebaseapp.com",
  projectId: "miannazikfareedawan",
  storageBucket: "miannazikfareedawan.firebasestorage.app",
  messagingSenderId: "764332761980",
  appId: "1:764332761980:web:99cdf405927e708bbbbaf9",
});
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);

// ─── Constants ────────────────────────────────────────────────────────────────
const OU = "mianalpha", OP = "alipur786", WA = "923001974040";
const CATS = [
  { id: "سب", n: "سب", i: "🔩" },
  { id: "انجن", n: "انجن", i: "🔧" },
  { id: "بریک", n: "بریک", i: "🛑" },
  { id: "سسپنشن", n: "سسپنشن", i: "🔩" },
  { id: "برقی", n: "برقی", i: "⚡" },
  { id: "باڈی پارٹس", n: "باڈی پارٹس", i: "🚛" },
  { id: "دیگر", n: "دیگر", i: "📦" },
];
const DEMO_PRODUCTS = [
  { id: "p1", name: "ایئر فلٹر ہینو", category: "انجن", tags: ["ہینو", "فلٹر"], status: "in-stock", price: 1500 },
  { id: "p2", name: "بریک پیڈ مزدا", category: "بریک", tags: ["مزدا", "بریک"], status: "in-stock", price: 2200 },
  { id: "p3", name: "آئل فلٹر نسان", category: "انجن", tags: ["نسان", "فلٹر"], status: "in-stock", price: 1800 },
  { id: "p4", name: "شاک ابزربر بیڈفورڈ", category: "سسپنشن", tags: ["بیڈفورڈ"], status: "sold", price: 5500 },
  { id: "p5", name: "ہیڈ لائٹ بلب", category: "برقی", tags: ["بلب"], status: "in-stock", price: 800 },
  { id: "p6", name: "ریڈی ایٹر ہوز", category: "انجن", tags: ["ہوز"], status: "in-stock", price: 1200 },
  { id: "p7", name: "کلچ پلیٹ ہینو", category: "انجن", tags: ["ہینو", "کلچ"], status: "in-stock", price: 8500 },
  { id: "p8", name: "الٹرنیٹر بیلٹ", category: "برقی", tags: ["بیلٹ"], status: "in-stock", price: 950 },
  { id: "p9", name: "ڈور ہینڈل مزدا", category: "باڈی پارٹس", tags: ["مزدا"], status: "in-stock", price: 1100 },
  { id: "p10", name: "فیول پمپ نسان", category: "انجن", tags: ["نسان", "پمپ"], status: "sold", price: 4200 },
  { id: "p11", name: "وائپر بلیڈ", category: "باڈی پارٹس", tags: ["وائپر"], status: "in-stock", price: 600 },
  { id: "p12", name: "بریک ڈرم", category: "بریک", tags: ["ڈرم", "بریک"], status: "in-stock", price: 3800 },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
const ls = {
  get: (k, def) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : def; } catch { return def; } },
  set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
};
const b64 = (file) => new Promise((res, rej) => {
  const r = new FileReader(); r.onload = () => res(r.result); r.onerror = rej; r.readAsDataURL(file);
});
const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

// ─── CSS ──────────────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;500;600;700&display=swap');
:root{--red:#cc0000;--rd:#990000;--org:#ff6600;--blk:#111;--font:'Noto Nastaliq Urdu',serif;--blur:blur(16px);--tr:all 0.4s cubic-bezier(0.4,0,0.2,1)}
*{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}
body{font-family:var(--font);background:#fff;color:var(--blk);direction:rtl;text-align:right;overflow-x:hidden}
.translated-ltr body,.translated-ltr .sec,.translated-ltr .hcon,.translated-ltr .htag,.translated-ltr .hsub,.translated-ltr .bp,.translated-ltr .bg{direction:ltr;text-align:left}
.translated-ltr .nlinks{direction:ltr}
.translated-ltr #nb{direction:ltr}
.translated-ltr .h555{direction:ltr}
.translated-ltr .fgrd,.translated-ltr .agrid,.translated-ltr .wgrid,.translated-ltr .pgrid,.translated-ltr .cgrid,.translated-ltr .fgrid,.translated-ltr .kgrid{direction:ltr;text-align:left}
.translated-ltr #cpanel{left:auto;right:0;border-right:none;border-left:1px solid rgba(204,0,0,.15)}
.translated-ltr .citem,.translated-ltr .cinf{direction:ltr;text-align:left}
.translated-ltr footer,.translated-ltr .fbot{direction:ltr;text-align:left}
.translated-ltr .stitle{direction:ltr}
.orb{position:fixed;border-radius:50%;filter:blur(80px);opacity:.1;pointer-events:none;z-index:-1;animation:orbF 8s ease-in-out infinite alternate}
.o1{width:600px;height:600px;background:radial-gradient(circle,#cc0000,transparent);top:-10%;right:-10%}
.o2{width:400px;height:400px;background:radial-gradient(circle,#ff6600,transparent);bottom:10%;left:-5%;animation-delay:2s}
.o3{width:300px;height:300px;background:radial-gradient(circle,#cc0000,transparent);top:40%;left:20%;animation-delay:4s}
@keyframes orbF{0%{transform:translate(0,0) scale(1)}100%{transform:translate(30px,-30px) scale(1.1)}}
#loader{position:fixed;inset:0;background:#0a0a0a;z-index:10000;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:20px;transition:opacity .5s}
.lf{display:flex;align-items:center}
.l5{font-size:120px;font-weight:900;font-family:'Arial Black',sans-serif;-webkit-text-stroke:2px var(--red);color:transparent;text-shadow:0 0 30px var(--red);animation:f5 .5s ease-in-out infinite alternate;line-height:1}
.l5:nth-child(1){color:var(--red);-webkit-text-stroke:none}.l5:nth-child(2){font-size:80px;opacity:.6;animation-delay:.15s}.l5:nth-child(3){font-size:50px;opacity:.3;animation-delay:.3s}
@keyframes f5{0%{transform:scale(1) rotate(-5deg)}100%{transform:scale(1.1) rotate(5deg)}}
.lt{color:rgba(255,255,255,.6);font-size:1.2rem;animation:pls 1s ease-in-out infinite}
@keyframes pls{0%,100%{opacity:.4}50%{opacity:1}}
.lr{width:80px;height:80px;border:3px solid transparent;border-top-color:var(--red);border-right-color:var(--org);border-radius:50%;animation:sp 1s linear infinite}
@keyframes sp{to{transform:rotate(360deg)}}
#nb{position:fixed;top:0;width:100%;z-index:1000;padding:0 30px;height:70px;display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.88);backdrop-filter:var(--blur);border-bottom:1px solid rgba(204,0,0,.15);box-shadow:0 4px 24px rgba(0,0,0,.08);transition:var(--tr)}
.nlogo{display:flex;align-items:center;gap:12px;cursor:pointer}
.n555{font-family:'Arial Black',sans-serif;font-size:2rem;font-weight:900;color:var(--red);letter-spacing:-2px}
.ntxt{font-family:var(--font);font-size:1rem;color:var(--blk);font-weight:600;line-height:1.3}
.nlinks{display:flex;align-items:center;gap:6px;list-style:none}
.nlinks a,.nlinks button{font-family:var(--font);font-size:.9rem;color:var(--blk);text-decoration:none;padding:8px 14px;border-radius:8px;border:none;background:transparent;cursor:pointer;transition:var(--tr);white-space:nowrap;display:inline-flex;align-items:center;justify-content:center;gap:4px;min-height:38px}
.nlinks a:hover,.nlinks button:hover{background:rgba(204,0,0,.08);color:var(--red)}
.ndrop{position:relative}
.ndropbtn{font-family:var(--font);font-size:.9rem;padding:8px 14px;border:none;background:transparent;cursor:pointer;border-radius:8px;transition:var(--tr)}
.ndropbtn:hover{background:rgba(204,0,0,.08);color:var(--red)}
.dmenu{position:absolute;top:calc(100% + 8px);right:0;background:rgba(255,255,255,.98);backdrop-filter:var(--blur);border:1px solid rgba(204,0,0,.15);border-radius:12px;padding:8px;min-width:160px;box-shadow:0 8px 32px rgba(0,0,0,.12);z-index:1001;animation:dIn .2s ease}
@keyframes dIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
.dmenu a{display:block;padding:10px 14px;border-radius:8px;font-family:var(--font);font-size:.9rem;color:var(--blk);text-decoration:none;transition:var(--tr);cursor:pointer}
.dmenu a:hover{background:rgba(204,0,0,.08);color:var(--red)}
.cbtn{position:relative;padding:8px 16px;background:var(--red);color:white!important;border-radius:10px;font-family:var(--font);font-size:.9rem;border:none;cursor:pointer;transition:var(--tr)}
.cbtn:hover{background:var(--rd)!important;transform:translateY(-1px)}
.cbadge{position:absolute;top:-6px;left:-6px;background:var(--org);color:white;border-radius:50%;width:20px;height:20px;font-size:.7rem;display:flex;align-items:center;justify-content:center;font-family:Arial,sans-serif;font-weight:bold}
.obadge{background:linear-gradient(135deg,var(--org),var(--red));color:white;padding:4px 12px;border-radius:20px;font-size:.8rem;font-family:var(--font)}
.hbgr{display:none;flex-direction:column;gap:5px;cursor:pointer;padding:8px;background:transparent;border:none}
.hbgr span{display:block;width:24px;height:2px;background:var(--blk);border-radius:2px;transition:var(--tr)}
@media(max-width:900px){.hbgr{display:flex}.nlinks{display:none;flex-direction:column;position:absolute;top:70px;right:0;left:0;background:rgba(255,255,255,.98);backdrop-filter:var(--blur);padding:16px;border-bottom:1px solid rgba(204,0,0,.1);z-index:999}.nlinks.open{display:flex}}
.sec{padding:70px 30px;max-width:1300px;margin:0 auto}
.stitle{font-family:var(--font);font-size:clamp(1.8rem,4vw,2.8rem);color:var(--red);text-align:center;margin-bottom:50px;position:relative;opacity:0;transform:translateY(30px);transition:opacity .6s ease .05s,transform .6s ease .05s}
.stitle::after{content:'';display:block;height:4px;background:linear-gradient(90deg,var(--red),var(--org));margin:12px auto 0;border-radius:2px;width:0;transition:width .75s cubic-bezier(0.4,0,0.2,1) .45s}
.stitle.in{opacity:1;transform:translateY(0)}.stitle.in::after{width:80px}
.gl{background:rgba(255,255,255,.72);backdrop-filter:var(--blur);border:1px solid rgba(204,0,0,.14);border-radius:20px;box-shadow:0 8px 32px rgba(0,0,0,.08),inset 0 1px 0 rgba(255,255,255,.8);transition:var(--tr);overflow:hidden}
.gl:hover{transform:translateY(-6px);box-shadow:0 16px 48px rgba(0,0,0,.12);border-color:rgba(204,0,0,.3)}
.sa{opacity:0;transition-property:opacity,transform;transition-timing-function:cubic-bezier(0.4,0,0.2,1);transition-duration:.65s}
.su{transform:translateY(52px)}.sl{transform:translateX(56px)}.sr{transform:translateX(-56px)}.ss{transform:scale(.85) translateY(20px)}
.sa.in{opacity:1;transform:translateY(0) translateX(0) scale(1)}
#hero{height:100vh;position:relative;display:flex;align-items:center;justify-content:center;overflow:hidden}
.hs{position:absolute;inset:0;opacity:0;transition:opacity 1.5s ease}.hs.active{opacity:1}
.hs1{background:repeating-linear-gradient(45deg,transparent,transparent 20px,rgba(204,0,0,.03) 20px,rgba(204,0,0,.03) 21px),linear-gradient(160deg,#1a0000,#2d0a0a 30%,#0a0a1a 60%,#000)}
.hs2{background:repeating-linear-gradient(-45deg,transparent,transparent 20px,rgba(255,102,0,.03) 20px,rgba(255,102,0,.03) 21px),linear-gradient(160deg,#0a1a00,#1a0d00 40%,#000)}
.hs3{background:radial-gradient(ellipse at 20% 50%,rgba(204,0,0,.1),transparent 60%),linear-gradient(200deg,#000,#1a0005 50%,#000)}
.hov{position:absolute;inset:0;background:radial-gradient(ellipse 80% 60% at center,transparent 30%,rgba(0,0,0,.7) 100%),linear-gradient(to top,rgba(0,0,0,.8),transparent 50%);z-index:1}
.hpat{position:absolute;inset:0;z-index:1;opacity:.07;background-image:repeating-conic-gradient(at 0% 100%,#cc0000 0deg,transparent 30deg,#ff6600 60deg,transparent 90deg);background-size:120px 120px}
.hcon{position:relative;z-index:10;text-align:center;padding:20px;display:flex;flex-direction:column;align-items:center}
.h555{font-family:'Arial Black',sans-serif;font-size:clamp(100px,20vw,220px);font-weight:900;color:white;line-height:.85;text-shadow:0 0 80px rgba(204,0,0,.8),0 0 160px rgba(204,0,0,.4);animation:hIn 1s ease .5s both;letter-spacing:-10px;direction:ltr;unicode-bidi:isolate;display:inline-block}
.h555 span{color:var(--red);display:inline-block;letter-spacing:-10px}
.htag{font-family:var(--font);font-size:clamp(1.5rem,4vw,2.8rem);color:rgba(255,255,255,.9);margin-top:10px;animation:hIn 1s ease .8s both}
.hsub{font-family:var(--font);font-size:clamp(1rem,2vw,1.4rem);color:rgba(255,255,255,.6);margin-top:16px;animation:hIn 1s ease 1.1s both}
.hcta{display:inline-flex;gap:16px;margin-top:40px;flex-wrap:wrap;justify-content:center;animation:hIn 1s ease 1.4s both}
@keyframes hIn{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
.hdots{position:absolute;bottom:30px;left:50%;transform:translateX(-50%);display:flex;gap:10px;z-index:10}
.hdot{width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,.4);cursor:pointer;transition:var(--tr)}.hdot.active{background:var(--org);width:24px;border-radius:4px}
.bp{padding:14px 32px;background:var(--red);color:white;border:none;border-radius:12px;font-family:var(--font);font-size:1.1rem;cursor:pointer;transition:var(--tr);box-shadow:0 4px 20px rgba(204,0,0,.4);display:inline-flex;align-items:center;justify-content:center;gap:6px;min-height:52px;direction:rtl}.bp:hover{background:var(--rd);transform:translateY(-3px)}
.bg{padding:14px 32px;background:rgba(255,255,255,.15);color:white;border:1px solid rgba(255,255,255,.3);border-radius:12px;font-family:var(--font);font-size:1.1rem;cursor:pointer;backdrop-filter:var(--blur);transition:var(--tr);display:inline-flex;align-items:center;justify-content:center;gap:6px;min-height:52px;direction:rtl}.bg:hover{background:rgba(255,255,255,.25);transform:translateY(-3px)}
#gcrl{display:flex;gap:16px;overflow-x:auto;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;padding-bottom:12px;scrollbar-width:thin;scrollbar-color:rgba(204,0,0,.3) transparent}
#gcrl::-webkit-scrollbar{height:4px}#gcrl::-webkit-scrollbar-thumb{background:rgba(204,0,0,.3);border-radius:2px}
.gcard{flex:0 0 280px;scroll-snap-align:start;border-radius:16px;overflow:hidden;position:relative;border:1px solid rgba(204,0,0,.1);transition:var(--tr);box-shadow:0 4px 16px rgba(0,0,0,.08)}
.gcard:hover{transform:translateY(-4px);box-shadow:0 12px 32px rgba(0,0,0,.15)}
.gcard img{width:100%;height:220px;object-fit:cover;display:block;transition:transform .4s ease;cursor:pointer}.gcard:hover img{transform:scale(1.04)}
.gcap{padding:12px 14px;font-family:var(--font);font-size:.9rem;background:rgba(255,255,255,.95)}
.gdel{position:absolute;top:8px;right:8px;width:28px;height:28px;background:rgba(204,0,0,.85);color:white;border:none;border-radius:50%;font-size:.8rem;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:5}
.garr{position:absolute;top:50%;transform:translateY(-50%);width:40px;height:40px;border-radius:50%;border:none;background:rgba(255,255,255,.92);box-shadow:0 4px 16px rgba(0,0,0,.15);font-size:1.2rem;cursor:pointer;z-index:10;display:flex;align-items:center;justify-content:center;transition:all .2s}
.garr:hover{background:var(--red);color:white}.garrl{left:-5px}.garrr{right:-5px}
.fgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:20px}
.fcard{background:rgba(255,255,255,.7);backdrop-filter:var(--blur);border:1px solid rgba(204,0,0,.1);border-radius:18px;padding:28px 20px;text-align:center;transition:var(--tr)}.fcard:hover{transform:translateY(-5px);border-color:var(--red)}
.fic{font-size:2.5rem;margin-bottom:12px}.ftit{font-family:var(--font);font-size:1.1rem;color:var(--red);font-weight:700;margin-bottom:8px}.fdesc{font-family:var(--font);font-size:.9rem;color:#666;line-height:1.8}
.cgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:16px}
.cchip{padding:20px 16px;text-align:center;cursor:pointer;border-radius:16px;background:rgba(255,255,255,.7);border:1px solid rgba(204,0,0,.15);backdrop-filter:var(--blur);transition:var(--tr);position:relative}
.cchip:hover{background:rgba(204,0,0,.08);border-color:var(--red);transform:translateY(-4px)}.cchip.ac{background:var(--red);color:white}
.cname{font-family:var(--font);font-size:1rem;font-weight:600;display:block;margin-top:6px}.cic{font-size:1.8rem}
.cdot{position:absolute;top:8px;left:8px;width:10px;height:10px;background:var(--org);border-radius:50%;box-shadow:0 0 8px var(--org)}
.pgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:20px}
.pcard{background:rgba(255,255,255,.75);backdrop-filter:var(--blur);border:1px solid rgba(204,0,0,.12);border-radius:18px;padding:24px 20px;transition:var(--tr);position:relative}
.pcard:hover{transform:translateY(-6px);border-color:rgba(204,0,0,.3);box-shadow:0 12px 40px rgba(0,0,0,.1)}.pcard.sel{border-color:var(--org);background:rgba(255,102,0,.06);box-shadow:0 0 0 2px var(--org)}.pcard.sold-card{opacity:.6}
.pbadge{position:absolute;top:14px;left:14px;padding:4px 10px;border-radius:20px;font-size:.75rem;font-family:var(--font);font-weight:600}
.bin{background:rgba(0,180,0,.12);color:#008800;border:1px solid rgba(0,180,0,.2)}.bsold{background:rgba(204,0,0,.12);color:var(--red);border:1px solid rgba(204,0,0,.2)}
.pname{font-family:var(--font);font-size:1.1rem;font-weight:700;margin-bottom:8px;margin-top:28px;line-height:1.5}
.ptag0{display:inline-block;padding:3px 10px;background:rgba(204,0,0,.08);border-radius:20px;font-size:.8rem;color:var(--red);font-family:var(--font);margin-bottom:10px}
.ptags{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:14px}.ptag{padding:2px 8px;background:rgba(255,102,0,.08);border-radius:10px;font-size:.75rem;color:var(--org);font-family:var(--font)}
.prow{display:flex;align-items:center;justify-content:space-between;margin-top:14px;gap:10px}
.chkw{display:flex;align-items:center;gap:8px;cursor:pointer}.chkb{width:22px;height:22px;border:2px solid rgba(204,0,0,.3);border-radius:6px;display:flex;align-items:center;justify-content:center;transition:var(--tr);background:white;flex-shrink:0}
.chkb.checked{background:var(--org);border-color:var(--org)}
.ac2{padding:8px 16px;background:var(--red);color:white;border:none;border-radius:10px;font-family:var(--font);font-size:.85rem;cursor:pointer;transition:var(--tr)}.ac2:hover{background:var(--rd);transform:scale(1.05)}.ac2:disabled{background:#ccc;cursor:not-allowed}
.agrid{display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:center}
@media(max-width:768px){.agrid{grid-template-columns:1fr}}
.ocard{background:rgba(255,255,255,.75);backdrop-filter:var(--blur);border:1px solid rgba(204,0,0,.12);border-radius:20px;padding:32px;text-align:center}
.oph{width:120px;height:120px;border-radius:50%;background:linear-gradient(135deg,#cc0000,#ff6600);margin:0 auto 16px;display:flex;align-items:center;justify-content:center;font-size:3rem;box-shadow:0 8px 24px rgba(204,0,0,.3)}
.oname{font-family:var(--font);font-size:1.4rem;color:var(--red);font-weight:700;margin-bottom:4px}.orole{font-family:var(--font);font-size:.95rem;color:#888;margin-bottom:16px}.obio{font-family:var(--font);font-size:.95rem;color:#555;line-height:2}
.atxt{font-family:var(--font);font-size:1rem;color:#444;line-height:2.2}.atxt h3{font-size:1.5rem;color:var(--red);margin-bottom:14px}
.wgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:24px}
.wcard{background:rgba(255,255,255,.75);backdrop-filter:var(--blur);border:1px solid rgba(204,0,0,.12);border-radius:20px;padding:28px 24px;text-align:center;transition:var(--tr);position:relative;overflow:hidden}
.wcard::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,var(--red),var(--org))}
.wcard:hover{transform:translateY(-6px);box-shadow:0 16px 48px rgba(0,0,0,.12)}
.wav{width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg,var(--red),var(--org));display:flex;align-items:center;justify-content:center;font-size:1.8rem;margin:0 auto 14px;box-shadow:0 4px 16px rgba(204,0,0,.25)}
.wname{font-family:var(--font);font-size:1.2rem;font-weight:700;color:var(--red);margin-bottom:8px}.wrip{font-size:.8rem;color:var(--org);font-family:var(--font);display:block;margin-top:2px}.wdesc{font-family:var(--font);font-size:.9rem;color:#555;line-height:1.8}
.kgrid{display:grid;grid-template-columns:1fr 1fr;gap:30px}
@media(max-width:768px){.kgrid{grid-template-columns:1fr}}
.kcard{background:rgba(255,255,255,.75);backdrop-filter:var(--blur);border:1px solid rgba(204,0,0,.12);border-radius:20px;padding:32px}
.kitem{display:flex;align-items:flex-start;gap:14px;margin-bottom:22px;padding-bottom:22px;border-bottom:1px solid rgba(204,0,0,.08)}.kitem:last-child{border-bottom:none;margin-bottom:0;padding-bottom:0}
.kic{width:48px;height:48px;background:linear-gradient(135deg,var(--red),var(--rd));border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:1.3rem;flex-shrink:0;box-shadow:0 4px 12px rgba(204,0,0,.25)}
.klbl{font-family:var(--font);font-size:.85rem;color:#888;margin-bottom:3px}.kval{font-family:var(--font);font-size:1rem;color:var(--blk);font-weight:600}
.mapbox{border-radius:20px;overflow:hidden;border:1px solid rgba(204,0,0,.15);height:400px}.mapbox iframe{width:100%;height:100%;border:none}
.callbtn{display:flex;align-items:center;justify-content:center;gap:10px;width:100%;padding:15px;background:var(--red);color:white;border:none;border-radius:12px;font-family:var(--font);font-size:1rem;cursor:pointer;transition:var(--tr);text-decoration:none;margin-top:16px}.callbtn:hover{background:var(--rd);transform:translateY(-2px)}
.wabtn{display:flex;align-items:center;justify-content:center;gap:10px;width:100%;padding:15px;background:#25d366;color:white;border:none;border-radius:12px;font-family:var(--font);font-size:1rem;cursor:pointer;transition:var(--tr);text-decoration:none;margin-top:10px}.wabtn:hover{background:#128c7e;transform:translateY(-2px)}
.livedot{display:inline-flex;align-items:center;gap:8px;padding:7px 14px;background:rgba(0,180,0,.1);border:1px solid rgba(0,180,0,.2);border-radius:30px;font-family:var(--font);font-size:.85rem;color:#008800;margin-top:10px}
.dotblink{width:8px;height:8px;background:#00bb00;border-radius:50%;animation:blk 1.5s ease-in-out infinite}
@keyframes blk{0%,100%{opacity:1}50%{opacity:.3}}
.dstats{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:16px;margin-bottom:28px}
.statc{background:rgba(255,255,255,.85);backdrop-filter:var(--blur);border:1px solid rgba(204,0,0,.1);border-radius:16px;padding:20px 24px;display:flex;align-items:center;gap:14px;transition:var(--tr)}.statc:hover{transform:translateY(-3px)}
.stic{font-size:2.2rem}.stnum{font-family:'Arial Black',sans-serif;font-size:2rem;font-weight:900;color:var(--red);line-height:1}.stlbl{font-family:var(--font);font-size:.85rem;color:#888}
.dpanel{background:rgba(255,255,255,.85);backdrop-filter:var(--blur);border:1px solid rgba(204,0,0,.1);border-radius:18px;padding:26px;margin-bottom:24px}
.ptitle{font-family:var(--font);font-size:1.3rem;color:var(--red);font-weight:700;margin-bottom:20px;padding-bottom:12px;border-bottom:1px solid rgba(204,0,0,.08);display:flex;align-items:center;gap:8px}
.aform{display:grid;grid-template-columns:1fr 1fr;gap:14px}
@media(max-width:600px){.aform{grid-template-columns:1fr}}
.fg{display:flex;flex-direction:column;gap:6px}.fg.full{grid-column:1/-1}
.fglbl{font-family:var(--font);font-size:.9rem;color:#555;font-weight:600}
.fginp{padding:11px 14px;border:1px solid rgba(204,0,0,.2);border-radius:10px;font-family:var(--font);font-size:.95rem;background:rgba(255,255,255,.85);direction:rtl;outline:none;width:100%;transition:var(--tr)}.fginp:focus{border-color:var(--red);box-shadow:0 0 0 3px rgba(204,0,0,.1)}
.fgsel{padding:11px 14px;border:1px solid rgba(204,0,0,.2);border-radius:10px;font-family:var(--font);font-size:.95rem;background:rgba(255,255,255,.85);direction:rtl;outline:none;cursor:pointer;width:100%}
.svbtn{padding:13px 28px;background:var(--red);color:white;border:none;border-radius:12px;font-family:var(--font);font-size:1rem;cursor:pointer;transition:var(--tr)}.svbtn:hover{background:var(--rd);transform:translateY(-2px)}
.cxbtn{padding:13px 20px;background:rgba(0,0,0,.06);color:var(--blk);border:none;border-radius:12px;font-family:var(--font);font-size:1rem;cursor:pointer}
.ptbl{width:100%;border-collapse:collapse}.ptbl th{font-family:var(--font);font-size:.85rem;color:#888;padding:10px 12px;text-align:right;border-bottom:1px solid rgba(204,0,0,.1);font-weight:600}.ptbl td{font-family:var(--font);font-size:.88rem;padding:12px;border-bottom:1px solid rgba(204,0,0,.06);vertical-align:middle}
.tcat{display:inline-block;padding:3px 9px;background:rgba(204,0,0,.08);border-radius:20px;font-size:.78rem;color:var(--red)}
.tin{display:inline-block;padding:3px 10px;border-radius:20px;font-size:.78rem;font-weight:600;background:rgba(0,180,0,.1);color:#008800;border:1px solid rgba(0,180,0,.2)}
.tsold{display:inline-block;padding:3px 10px;border-radius:20px;font-size:.78rem;font-weight:600;background:rgba(204,0,0,.1);color:var(--red);border:1px solid rgba(204,0,0,.2)}
.tacts{display:flex;gap:5px;flex-wrap:wrap}.tsm{padding:5px 11px;border:none;border-radius:8px;font-family:var(--font);font-size:.78rem;cursor:pointer;transition:var(--tr)}
.ted{background:rgba(0,100,255,.1);color:#0066cc}.ted:hover{background:#0066cc;color:white}
.tdl{background:rgba(204,0,0,.1);color:var(--red)}.tdl:hover{background:var(--red);color:white}
.ttg{background:rgba(255,140,0,.1);color:#cc7700}.ttg:hover{background:#cc7700;color:white}
.gupa{border:2px dashed rgba(204,0,0,.25);border-radius:14px;padding:28px;text-align:center;cursor:pointer;transition:var(--tr);margin-bottom:16px}.gupa:hover{border-color:var(--red);background:rgba(204,0,0,.03)}
.gthumbs{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:10px;margin-top:14px}
.gthumb{position:relative;border-radius:10px;overflow:hidden;border:1px solid rgba(204,0,0,.1)}.gthumb img{width:100%;height:90px;object-fit:cover;display:block}
.gtdel{position:absolute;top:4px;right:4px;width:24px;height:24px;background:rgba(204,0,0,.85);color:white;border:none;border-radius:50%;font-size:.7rem;cursor:pointer;display:flex;align-items:center;justify-content:center}
.gtcap{font-family:var(--font);font-size:.72rem;color:#555;padding:4px 6px;background:rgba(255,255,255,.95)}
.cov{position:fixed;inset:0;background:rgba(0,0,0,.3);z-index:1999;backdrop-filter:blur(4px)}
#cpanel{position:fixed;top:0;left:0;width:420px;height:100vh;background:rgba(255,255,255,.97);backdrop-filter:var(--blur);border-right:1px solid rgba(204,0,0,.15);box-shadow:4px 0 40px rgba(0,0,0,.15);z-index:2000;display:flex;flex-direction:column}
.chdr{padding:24px 20px;border-bottom:1px solid rgba(204,0,0,.1);display:flex;align-items:center;justify-content:space-between}
.cttl{font-family:var(--font);font-size:1.4rem;color:var(--red);font-weight:700}
.ccls{width:36px;height:36px;border:none;background:rgba(204,0,0,.08);border-radius:50%;cursor:pointer;font-size:1.2rem;display:flex;align-items:center;justify-content:center;transition:var(--tr)}.ccls:hover{background:var(--red);color:white}
.clist{flex:1;overflow-y:auto;padding:16px}
.citem{display:flex;gap:12px;padding:14px;background:rgba(255,255,255,.8);border:1px solid rgba(204,0,0,.1);border-radius:14px;margin-bottom:10px;align-items:center}
.cinf{flex:1}.cinm{font-family:var(--font);font-size:.95rem;font-weight:600}.cicat{font-family:var(--font);font-size:.8rem;color:var(--red)}
.ciqty{display:flex;align-items:center;gap:8px;background:rgba(204,0,0,.06);border-radius:10px;padding:4px 8px}
.qbtn{width:24px;height:24px;border:none;background:var(--red);color:white;border-radius:6px;cursor:pointer;font-size:1rem;display:flex;align-items:center;justify-content:center}.qbtn:hover{background:var(--rd)}
.qnum{font-family:Arial,sans-serif;font-size:.9rem;min-width:20px;text-align:center;font-weight:700;direction:ltr}
.cdel{width:30px;height:30px;border:none;background:rgba(204,0,0,.08);color:var(--red);border-radius:8px;cursor:pointer;font-size:1rem;display:flex;align-items:center;justify-content:center}.cdel:hover{background:var(--red);color:white}
.cfoot{padding:20px;border-top:1px solid rgba(204,0,0,.1)}.csum{font-family:var(--font);font-size:.95rem;color:#666;margin-bottom:14px;text-align:center}
.cwabtn{width:100%;padding:14px;background:linear-gradient(135deg,var(--red),var(--rd));color:white;border:none;border-radius:12px;font-family:var(--font);font-size:1.1rem;cursor:pointer;transition:var(--tr)}.cwabtn:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(204,0,0,.4)}
.cempty{text-align:center;padding:60px 20px;color:#888;font-family:var(--font);font-size:1.1rem}
#dbar{position:fixed;bottom:20px;left:50%;transform:translateX(-50%);z-index:500;background:rgba(255,255,255,.92);backdrop-filter:var(--blur);border:1px solid rgba(204,0,0,.2);border-radius:50px;padding:12px 24px;display:flex;gap:12px;align-items:center;box-shadow:0 8px 32px rgba(0,0,0,.12);font-family:var(--font)}
.dbtn{padding:8px 20px;background:var(--red);color:white;border:none;border-radius:30px;font-family:var(--font);cursor:pointer;font-size:.9rem}
#notif{position:fixed;top:85px;right:20px;z-index:5000;padding:16px 18px;background:rgba(255,255,255,.98);border-radius:16px;box-shadow:0 12px 40px rgba(0,0,0,.18),0 2px 8px rgba(0,0,0,.08);font-family:var(--font);font-size:.95rem;max-width:300px;width:calc(100vw - 40px);animation:slideIn .35s cubic-bezier(0.34,1.56,0.64,1);border:1px solid rgba(204,0,0,.08)}
.notif-ok{border-right:4px solid green}.notif-er{border-right:4px solid var(--red)}
.cfbox{background:white;border-radius:20px;padding:36px 32px;text-align:center;max-width:360px;width:90%;animation:scIn .3s ease}
@keyframes scIn{from{opacity:0;transform:scale(.9)}to{opacity:1;transform:scale(1)}}
.cfic{font-size:2.5rem;margin-bottom:12px}.cftt{font-family:var(--font);font-size:1.3rem;color:var(--blk);margin-bottom:8px;font-weight:700}.cfmsg{font-family:var(--font);font-size:1rem;color:#666;margin-bottom:24px}
.cfbtns{display:flex;gap:12px;justify-content:center}.cfy{padding:10px 28px;background:var(--red);color:white;border:none;border-radius:10px;font-family:var(--font);cursor:pointer;font-size:1rem}.cfn{padding:10px 28px;background:rgba(0,0,0,.08);color:var(--blk);border:none;border-radius:10px;font-family:var(--font);cursor:pointer;font-size:1rem}
.lbox{background:rgba(255,255,255,.97);border-radius:24px;padding:48px 40px;width:100%;max-width:420px;box-shadow:0 20px 80px rgba(0,0,0,.3);text-align:center;position:relative;animation:scIn .4s cubic-bezier(0.4,0,0.2,1)}
.l555{font-family:'Arial Black',sans-serif;font-size:4rem;font-weight:900;color:var(--red);margin-bottom:4px}
.ltit{font-family:var(--font);font-size:1.3rem;color:var(--blk);margin-bottom:30px}.lform{display:flex;flex-direction:column;gap:14px}
.linp{padding:14px 18px;border:1px solid rgba(204,0,0,.2);border-radius:12px;font-family:var(--font);font-size:1rem;text-align:right;direction:rtl;outline:none;transition:var(--tr)}.linp:focus{border-color:var(--red);box-shadow:0 0 0 3px rgba(204,0,0,.1)}
.lbtn{padding:14px;background:linear-gradient(135deg,var(--red),var(--rd));color:white;border:none;border-radius:12px;font-family:var(--font);font-size:1.1rem;cursor:pointer;transition:var(--tr)}.lbtn:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(204,0,0,.4)}
.lerr{color:var(--red);font-family:var(--font);font-size:.9rem;margin-top:4px}
.lcls{position:absolute;top:16px;left:16px;width:32px;height:32px;border:none;background:rgba(0,0,0,.08);border-radius:50%;cursor:pointer;font-size:1rem;display:flex;align-items:center;justify-content:center;transition:var(--tr)}.lcls:hover{background:var(--red);color:white}
#topbtn{position:fixed;bottom:80px;left:24px;width:44px;height:44px;background:var(--red);color:white;border:none;border-radius:12px;font-size:1.2rem;cursor:pointer;z-index:400;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 16px rgba(204,0,0,.3);transition:var(--tr)}.topbtn:hover{transform:translateY(-3px)}
footer{background:rgba(10,0,0,.96);color:white;padding:50px 30px 20px;margin-top:60px}
.fgrd{max-width:1300px;margin:0 auto 40px;display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:40px}
@media(max-width:900px){.fgrd{grid-template-columns:1fr 1fr;gap:30px}}
@media(max-width:600px){.fgrd{grid-template-columns:1fr}}
.f555{font-family:'Arial Black',sans-serif;font-size:3rem;font-weight:900;color:var(--red);letter-spacing:-2px;line-height:1}
.fnm{font-family:var(--font);font-size:1rem;color:rgba(255,255,255,.8);margin-top:6px;margin-bottom:14px}.fdsc{font-family:var(--font);font-size:.85rem;color:rgba(255,255,255,.5);line-height:1.9}
.fttl{font-family:var(--font);font-size:1rem;color:var(--red);font-weight:700;margin-bottom:14px;padding-bottom:8px;border-bottom:1px solid rgba(204,0,0,.2)}
.flinks{list-style:none}.flinks li{margin-bottom:9px}.flinks a{font-family:var(--font);font-size:.9rem;color:rgba(255,255,255,.6);text-decoration:none;transition:var(--tr);cursor:pointer}.flinks a:hover{color:var(--org)}
.fci{display:flex;gap:10px;align-items:center;margin-bottom:9px;font-family:var(--font);font-size:.85rem;color:rgba(255,255,255,.6)}
.fbot{max-width:1300px;margin:0 auto;padding-top:20px;border-top:1px solid rgba(255,255,255,.08);text-align:center;font-family:var(--font);font-size:.85rem;color:rgba(255,255,255,.4)}
.ltr{direction:ltr;unicode-bidi:embed;display:inline-block}
.pdmodal-overlay{position:fixed;inset:0;z-index:4500;background:rgba(0,0,0,.75);backdrop-filter:blur(12px);display:flex;align-items:center;justify-content:center;padding:20px}
.pdmodal{background:#fff;border-radius:24px;width:100%;max-width:520px;max-height:90vh;overflow-y:auto;position:relative;animation:scIn .3s cubic-bezier(0.4,0,0.2,1);box-shadow:0 24px 80px rgba(0,0,0,.3)}
.pdmodal-img{width:100%;height:240px;object-fit:cover;border-radius:24px 24px 0 0;display:block}
.pdmodal-imgph{width:100%;height:200px;background:linear-gradient(135deg,rgba(204,0,0,.08),rgba(255,102,0,.08));border-radius:24px 24px 0 0;display:flex;align-items:center;justify-content:center;font-size:5rem}
.pdmodal-body{padding:28px}
.pdmodal-close{position:absolute;top:14px;right:14px;width:36px;height:36px;border:none;background:rgba(0,0,0,.4);color:white;border-radius:50%;font-size:1rem;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:10;transition:var(--tr)}.pdmodal-close:hover{background:var(--red)}
.pdmodal-badge{display:inline-flex;padding:5px 14px;border-radius:20px;font-size:.8rem;font-family:var(--font);font-weight:600;margin-bottom:14px}
.pdmodal-name{font-family:var(--font);font-size:1.5rem;font-weight:700;color:var(--blk);margin-bottom:8px;line-height:1.5}
.pdmodal-price{font-family:'Arial Black',sans-serif;font-size:1.8rem;font-weight:900;color:var(--red);direction:ltr;display:inline-block;margin-bottom:16px}
.pdmodal-price-na{font-family:var(--font);font-size:1rem;color:#bbb;margin-bottom:16px}
.pdmodal-divider{height:1px;background:rgba(204,0,0,.08);margin:16px 0}
.pdmodal-row{display:flex;align-items:center;gap:10px;margin-bottom:10px}
.pdmodal-ic{width:36px;height:36px;background:linear-gradient(135deg,rgba(204,0,0,.1),rgba(255,102,0,.1));border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:1rem;flex-shrink:0}
.pdmodal-lbl{font-family:var(--font);font-size:.82rem;color:#999}
.pdmodal-val{font-family:var(--font);font-size:.95rem;color:var(--blk);font-weight:600}
.pdmodal-tags{display:flex;flex-wrap:wrap;gap:6px;margin-top:4px}
.pdmodal-tag{padding:4px 12px;background:rgba(255,102,0,.08);border-radius:20px;font-size:.8rem;color:var(--org);font-family:var(--font)}
.pdmodal-actions{display:flex;gap:10px;margin-top:20px;flex-wrap:wrap}
.pdmodal-addcart{flex:1;padding:14px;background:var(--red);color:white;border:none;border-radius:12px;font-family:var(--font);font-size:1rem;cursor:pointer;transition:var(--tr);display:flex;align-items:center;justify-content:center;gap:8px}.pdmodal-addcart:hover{background:var(--rd);transform:translateY(-2px)}.pdmodal-addcart:disabled{background:#ccc;cursor:not-allowed;transform:none}
.pdmodal-wa{flex:1;padding:14px;background:#25d366;color:white;border:none;border-radius:12px;font-family:var(--font);font-size:1rem;cursor:pointer;transition:var(--tr);display:flex;align-items:center;justify-content:center;gap:8px;text-decoration:none}.pdmodal-wa:hover{background:#128c7e;transform:translateY(-2px)}
.pcard{cursor:pointer}

.pprice{font-family:'Arial Black',sans-serif;font-size:1.1rem;color:var(--red);font-weight:900;direction:ltr;display:inline-block;margin-bottom:10px}
.pprice-na{font-family:var(--font);font-size:.85rem;color:#bbb;margin-bottom:10px}
.cart-subtotal{background:rgba(204,0,0,.05);border:1px solid rgba(204,0,0,.1);border-radius:12px;padding:14px 16px;margin-bottom:12px}
.cart-subtotal-row{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px}
.cart-subtotal-row:last-child{margin-bottom:0;padding-top:8px;border-top:1px dashed rgba(204,0,0,.15);font-weight:700}
.cart-subtotal-lbl{font-family:var(--font);font-size:.85rem;color:#888}
.cart-subtotal-val{font-family:'Arial Black',sans-serif;font-size:.9rem;color:var(--blk);direction:ltr}
.cart-subtotal-total{font-family:'Arial Black',sans-serif;font-size:1.1rem;color:var(--red);direction:ltr}
.ciprice{font-family:'Arial Black',sans-serif;font-size:.8rem;color:var(--red);direction:ltr;display:block;margin-top:2px}

.srchbar{display:flex;align-items:center;gap:10px;background:rgba(255,255,255,.85);border:1.5px solid rgba(204,0,0,.18);border-radius:14px;padding:10px 18px;margin-bottom:28px;box-shadow:0 2px 12px rgba(0,0,0,.06);transition:border-color .3s}
.srchbar:focus-within{border-color:var(--red);box-shadow:0 0 0 3px rgba(204,0,0,.1)}
.srchbar input{flex:1;border:none;background:transparent;font-family:var(--font);font-size:1rem;direction:rtl;outline:none;color:var(--blk)}
.srchbar input::placeholder{color:#bbb}
.srchic{font-size:1.2rem;color:#bbb;flex-shrink:0}
.srchclear{background:none;border:none;cursor:pointer;color:#bbb;font-size:1rem;padding:2px 6px;border-radius:6px;transition:var(--tr)}.srchclear:hover{color:var(--red);background:rgba(204,0,0,.08)}
.srch-count{font-family:var(--font);font-size:.85rem;color:#999;text-align:center;margin-bottom:16px}
.pimg{width:100%;height:160px;object-fit:cover;border-radius:10px;margin-bottom:12px;display:block}
.pimg-placeholder{width:100%;height:120px;background:linear-gradient(135deg,rgba(204,0,0,.05),rgba(255,102,0,.05));border-radius:10px;margin-bottom:12px;display:flex;align-items:center;justify-content:center;font-size:2.5rem;border:1px dashed rgba(204,0,0,.12)}
.cart-clear{padding:8px 18px;background:rgba(204,0,0,.08);color:var(--red);border:1px solid rgba(204,0,0,.15);border-radius:10px;font-family:var(--font);font-size:.85rem;cursor:pointer;transition:var(--tr);width:100%;margin-bottom:10px}.cart-clear:hover{background:rgba(204,0,0,.15)}
.no-results{text-align:center;padding:60px 20px;font-family:var(--font);color:#aaa;font-size:1.1rem}
.no-results .nr-icon{font-size:3rem;margin-bottom:12px}

#lb-overlay{position:fixed;inset:0;z-index:9000;background:rgba(0,0,0,.92);backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;flex-direction:column;gap:16px;cursor:pointer}
#lb-overlay img{max-width:92vw;max-height:80vh;border-radius:12px}
`;

// ─── Scroll animation hook ────────────────────────────────────────────────────
function useGoogleTranslateFix() {
  useEffect(() => {
    const fix = () => {
      const isTranslated = document.documentElement.classList.contains('translated-ltr') ||
        document.body.classList.contains('translated-ltr');
      if (isTranslated) {
        document.documentElement.style.direction = 'ltr';
      }
    };
    const obs = new MutationObserver(fix);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    obs.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);
}

function useEscKey(handlers) {
  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') handlers.forEach(h => h && h()); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, []);
}

function useScrollAnim() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); } }),
      { rootMargin: "0px 0px -50px 0px", threshold: 0.1 }
    );
    const observe = () => document.querySelectorAll(".sa:not(.in),.stitle:not(.in)").forEach((el) => obs.observe(el));
    observe();
    const mo = new MutationObserver(observe);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { obs.disconnect(); mo.disconnect(); };
  }, []);
}

// ─── Notification ─────────────────────────────────────────────────────────────
function Notif({ msg, type, onDone, onCartClick }) {
  useEffect(() => { const t = setTimeout(onDone, 4000); return () => clearTimeout(t); }, [msg]);
  if (!msg) return null;
  const isCartMsg = type === "ok";
  return (
    <div id="notif" className={type === "ok" ? "notif-ok" : "notif-er"}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: isCartMsg ? 12 : 0 }}>
        <span style={{ fontSize: "1.3rem" }}>{type === "ok" ? "✅" : "❌"}</span>
        <span style={{ fontFamily: "var(--font)", fontSize: "1rem", flex: 1 }}>{msg}</span>
        <button onClick={onDone} style={{ background: "none", border: "none", cursor: "pointer", color: "#bbb", fontSize: "1rem", padding: "2px 6px", borderRadius: 6, lineHeight: 1 }}>✕</button>
      </div>
      {isCartMsg && (
        <button
          onClick={() => { onCartClick(); onDone(); }}
          style={{
            width: "100%",
            padding: "10px 0",
            background: "linear-gradient(135deg, var(--red), #ff4422)",
            color: "white",
            border: "none",
            borderRadius: 10,
            fontFamily: "var(--font)",
            fontSize: "1rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            boxShadow: "0 4px 14px rgba(204,0,0,.25)",
            transition: "all .2s",
          }}
          onMouseEnter={e => e.currentTarget.style.transform = "translateY(-1px)"}
          onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
        >
          🛒 کارٹ دیکھیں
        </button>
      )}
    </div>
  );
}

// ─── Loader ───────────────────────────────────────────────────────────────────
function Loader({ done }) {
  return (
    <div id="loader" style={{ opacity: done ? 0 : 1, pointerEvents: done ? "none" : "all" }}>
      <div className="lf"><span className="l5">5</span><span className="l5">5</span><span className="l5">5</span></div>
      <div className="lt">فاریور آٹوز لوڈ ہو رہا ہے</div>
      <div className="lr"></div>
    </div>
  );
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({ img, cap, onClose }) {
  if (!img) return null;
  return (
    <div id="lb-overlay" onClick={onClose}>
      <img src={img} alt={cap} />
      <div style={{ fontFamily: "var(--font)", color: "rgba(255,255,255,.8)", fontSize: "1.1rem" }}>{cap}</div>
      <div style={{ color: "rgba(255,255,255,.4)", fontFamily: "var(--font)", fontSize: ".85rem" }}>بند کرنے کے لیے کہیں بھی کلک کریں</div>
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar({ isOwner, cartCount, onCart, onLogin, onLogout, onCat, onDash }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  return (
    <nav id="nb">
      <div className="nlogo" onClick={() => window.scrollTo(0, 0)}>
        <span className="n555">555</span>
        <span className="ntxt">فاریور آٹوز<br /><small style={{ fontSize: ".75em", color: "#888" }}>ٹرک پارٹس</small></span>
      </div>
      <button className="hbgr" onClick={() => setMenuOpen(!menuOpen)}><span /><span /><span /></button>
      <ul className={`nlinks${menuOpen ? " open" : ""}`}>
        <li><a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo(0, 0); setMenuOpen(false); }}>🏠 ہوم</a></li>
        <li className="ndrop" onMouseEnter={() => setDropOpen(true)} onMouseLeave={() => setDropOpen(false)}>
          <button className="ndropbtn">📦 اقسام ▼</button>
          {dropOpen && <div className="dmenu">{CATS.map(c => <a key={c.id} onClick={() => { onCat(c.id); setDropOpen(false); setMenuOpen(false); }}>{c.i} {c.n}</a>)}</div>}
        </li>
        <li><a href="#" onClick={(e) => { e.preventDefault(); scrollTo("sgal"); setMenuOpen(false); }}>📷 گیلری</a></li>
        <li><a href="#" onClick={(e) => { e.preventDefault(); scrollTo("sabt"); setMenuOpen(false); }}>ℹ️ ہمارے بارے میں</a></li>
        <li><a href="#" onClick={(e) => { e.preventDefault(); scrollTo("swrk"); setMenuOpen(false); }}>👷 کاریگر</a></li>
        <li><a href="#" onClick={(e) => { e.preventDefault(); scrollTo("scon"); setMenuOpen(false); }}>📞 رابطہ</a></li>
        {!isOwner && <li><a href="#" onClick={(e) => { e.preventDefault(); onLogin(); setMenuOpen(false); }}>🔐 لاگ ان</a></li>}
        {isOwner && <li><a href="#" onClick={(e) => { e.preventDefault(); onLogout(); setMenuOpen(false); }}>🚪 لاگ آؤٹ</a></li>}
        {isOwner && <li><a href="#" onClick={(e) => { e.preventDefault(); onDash(); setMenuOpen(false); }} style={{ background: "rgba(204,0,0,.08)", color: "var(--red)", borderRadius: "8px", padding: "8px 14px" }}>👑 ڈیش بورڈ</a></li>}
        {isOwner && <li><span className="obadge">👑 میاں صاحب موڈ</span></li>}
        <li>
          <button className="cbtn" onClick={onCart} title="کارٹ کھولیں">
            🛒 کارٹ {cartCount > 0 && <span className="cbadge">{cartCount}</span>}
          </button>
        </li>
      </ul>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % 3), 4000);
    return () => clearInterval(t);
  }, []);
  return (
    <div id="hero">
      {[0, 1, 2].map(i => <div key={i} className={`hs hs${i + 1}${slide === i ? " active" : ""}`} />)}
      <div className="hpat" /><div className="hov" />
      <div className="hcon">
        <div className="h555"><span>5</span><span>5</span><span>5</span></div>
        <div className="htag">فاریور آٹوز</div>
        <div className="hsub">ٹرک پارٹس کے ماہر — مزدا بیڈفورڈ، ہینو، نسان</div>
        <div className="hcta">
          <button className="bp" onClick={() => scrollTo("sprods")}>🔩 پرزے دیکھیں</button>
          <button className="bg" onClick={() => scrollTo("scon")}>📞 رابطہ کریں</button>
        </div>
      </div>
      <div className="hdots">{[0, 1, 2].map(i => <div key={i} className={`hdot${slide === i ? " active" : ""}`} onClick={() => setSlide(i)} />)}</div>
    </div>
  );
}

// ─── Gallery ──────────────────────────────────────────────────────────────────
function Gallery({ gallery, isOwner, onUpload, onDelete, onLightbox }) {
  const gcrlRef = useRef();
  const [capInp, setCapInp] = useState("");
  const [fileInp, setFileInp] = useState(null);
  const [upStat, setUpStat] = useState("");
  const doUpload = async () => {
    if (!fileInp || !fileInp.length) return;
    setUpStat("اپلوڈ ہو رہی ہے...");
    await onUpload(Array.from(fileInp), capInp);
    setCapInp(""); setFileInp(null); setUpStat("✅ شامل ہو گئیں");
    setTimeout(() => setUpStat(""), 3000);
  };
  return (
    <div id="sgal" style={{ background: "rgba(250,248,248,.6)", padding: "70px 0" }}>
      <div className="sec" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <h2 className="stitle sa su">ہماری گیلری</h2>
        {isOwner && (
          <div style={{ marginBottom: 24, padding: 22, background: "rgba(255,255,255,.82)", backdropFilter: "var(--blur)", border: "1px solid rgba(204,0,0,.12)", borderRadius: 16 }}>
            <div style={{ fontFamily: "var(--font)", fontSize: "1.05rem", color: "var(--red)", fontWeight: 700, marginBottom: 14 }}>📷 گیلری میں تصاویر شامل کریں</div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "flex-end" }}>
              <div style={{ flex: 1, minWidth: 200 }}>
                <label style={{ fontFamily: "var(--font)", fontSize: ".85rem", color: "#666", display: "block", marginBottom: 5 }}>تصویر منتخب کریں</label>
                <input type="file" accept="image/*" multiple onChange={e => setFileInp(e.target.files)} style={{ fontFamily: "var(--font)", padding: 9, border: "1px dashed rgba(204,0,0,.3)", borderRadius: 10, width: "100%", background: "rgba(255,255,255,.8)" }} />
              </div>
              <div style={{ flex: 1, minWidth: 180 }}>
                <label style={{ fontFamily: "var(--font)", fontSize: ".85rem", color: "#666", display: "block", marginBottom: 5 }}>عنوان (اختیاری)</label>
                <input type="text" value={capInp} onChange={e => setCapInp(e.target.value)} placeholder="مثلاً: دکان کا منظر" className="fginp" />
              </div>
              <button onClick={doUpload} style={{ padding: "10px 22px", background: "var(--red)", color: "white", border: "none", borderRadius: 10, fontFamily: "var(--font)", cursor: "pointer", height: 42, whiteSpace: "nowrap" }}>✅ اپلوڈ</button>
            </div>
            {upStat && <div style={{ marginTop: 8, fontFamily: "var(--font)", fontSize: ".85rem", color: "#888" }}>{upStat}</div>}
          </div>
        )}
        <div style={{ position: "relative" }}>
          <div id="gcrl" ref={gcrlRef}>
            {!gallery.length
              ? <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", padding: "60px 20px", fontFamily: "var(--font)", color: "#bbb", fontSize: "1.1rem", flexDirection: "column", gap: 12 }}><span style={{ fontSize: "3rem" }}>📷</span><span>تصاویر جلد شامل ہوں گی</span></div>
              : gallery.map((g, i) => (
                <div key={g.id} className="gcard sa ss" style={{ transitionDelay: `${i * .08}s` }}>
                  {isOwner && <button className="gdel" onClick={() => onDelete(g.id)}>✕</button>}
                  <img src={g.url} alt={g.caption || ""} onClick={() => onLightbox(g.url, g.caption || "")} />
                  {g.caption && <div className="gcap">{g.caption}</div>}
                </div>
              ))
            }
          </div>
          <button className="garr garrl" onClick={() => gcrlRef.current?.scrollBy({ left: -310, behavior: "smooth" })}>‹</button>
          <button className="garr garrr" onClick={() => gcrlRef.current?.scrollBy({ left: 310, behavior: "smooth" })}>›</button>
        </div>
      </div>
    </div>
  );
}

// ─── Features ─────────────────────────────────────────────────────────────────
function Features() {
  const items = [
    { i: "🏆", t: "۱۵ سال کا تجربہ", d: "پندرہ سال سے علی پور میں ٹرک پارٹس کی فراہمی میں مہارت" },
    { i: "✅", t: "معیاری پرزے", d: "ہر پرزہ جانچ کر کے فراہم کیا جاتا ہے" },
    { i: "🕐", t: "چوبیس گھنٹے", d: "ہفتے کے ساتوں دن دستیاب" },
    { i: "🔧", t: "ماہر کاریگر", d: "تجربہ کار میکانکس کی ٹیم ہمہ وقت تیار" },
    { i: "🚛", t: "تمام برانڈ", d: "ہینو، مزدا، بیڈفورڈ، نسان سب دستیاب" },
    { i: "💬", t: "مفت مشورہ", d: "خریداری سے پہلے مفت مشورہ لیں" },
  ];
  return (
    <div className="sec">
      <h2 className="stitle sa su">ہمیں کیوں چنیں؟</h2>
      <div className="fgrid">
        {items.map((it, i) => (
          <div key={i} className="fcard sa ss" style={{ transitionDelay: `${i * .07}s` }}>
            <div className="fic">{it.i}</div><div className="ftit">{it.t}</div><div className="fdesc">{it.d}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Categories ───────────────────────────────────────────────────────────────
function Categories({ products, activeCat, selected, onCat }) {
  return (
    <div className="sec" id="scats">
      <h2 className="stitle sa su">اقسام</h2>
      <div className="cgrid">
        {CATS.map((c, i) => {
          const cnt = c.id === "سب" ? products.length : products.filter(p => p.category === c.id).length;
          const hasSel = c.id === "سب" ? selected.size > 0 : [...selected].some(id => products.find(p => p.id === id)?.category === c.id);
          return (
            <div key={c.id} className={`cchip sa ss${activeCat === c.id ? " ac" : ""}`} style={{ transitionDelay: `${i * .07}s` }} onClick={() => onCat(c.id)}>
              {hasSel && <div className="cdot" />}
              <span className="cic">{c.i}</span>
              <span className="cname">{c.n}</span>
              <small style={{ fontSize: ".72rem", color: "#999", fontFamily: "Arial,sans-serif" }}>({cnt})</small>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Product Detail Modal ─────────────────────────────────────────────────────
function ProductModal({ product, onClose, onAddCart }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);
  if (!product) return null;
  const isSold = product.status === "sold";
  const waMsg = encodeURIComponent(`السلام علیکم میاں صاحب! 🙏\n\nمجھے یہ پرزہ چاہیے:\n• ${product.name}\n• قسم: ${product.category}${product.price ? `\n• قیمت: Rs. ${product.price.toLocaleString()}` : ""}\n\nبراہ کرم دستیابی بتائیں۔`);
  return (
    <div className="pdmodal-overlay" onClick={onClose}>
      <div className="pdmodal" onClick={e => e.stopPropagation()}>
        <button className="pdmodal-close" onClick={onClose}>✕</button>
        {product.imgUrl
          ? <img src={product.imgUrl} alt={product.name} className="pdmodal-img" />
          : <div className="pdmodal-imgph">🔩</div>
        }
        <div className="pdmodal-body">
          <span className={`pdmodal-badge ${isSold ? "bsold" : "bin"}`}>{isSold ? "❌ فروخت شدہ" : "✅ دستیاب"}</span>
          <div className="pdmodal-name">{product.name}</div>
          {product.price
            ? <div className="pdmodal-price">Rs. {product.price.toLocaleString()}</div>
            : <div className="pdmodal-price-na">قیمت دریافت کریں</div>
          }
          <div className="pdmodal-divider" />
          <div className="pdmodal-row">
            <div className="pdmodal-ic">📦</div>
            <div><div className="pdmodal-lbl">قسم</div><div className="pdmodal-val">{product.category}</div></div>
          </div>
          {product.tags?.length > 0 && (
            <div className="pdmodal-row">
              <div className="pdmodal-ic">🏷️</div>
              <div>
                <div className="pdmodal-lbl">ٹیگز</div>
                <div className="pdmodal-tags">{product.tags.map((t, i) => <span key={i} className="pdmodal-tag">{t}</span>)}</div>
              </div>
            </div>
          )}
          <div className="pdmodal-row">
            <div className="pdmodal-ic">🔢</div>
            <div><div className="pdmodal-lbl">پرزہ نمبر</div><div className="pdmodal-val" style={{direction:"ltr",fontFamily:"Arial,sans-serif"}}>{product.id.toUpperCase()}</div></div>
          </div>
          <div className="pdmodal-divider" />
          <div className="pdmodal-actions">
            <button className="pdmodal-addcart" disabled={isSold} onClick={() => { onAddCart(product.id); onClose(); }}>
              {isSold ? "فروخت شدہ" : "🛒 کارٹ میں شامل کریں"}
            </button>
            <a href={`https://wa.me/923001974040?text=${waMsg}`} target="_blank" rel="noreferrer" className="pdmodal-wa">
              💬 واٹس ایپ
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Products ─────────────────────────────────────────────────────────────────
function Products({ products, activeCat, selected, onToggleSelect, onAddCart }) {
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const baselist = activeCat === "سب" ? products : products.filter(p => p.category === activeCat);
  const list = search.trim()
    ? baselist.filter(p =>
        p.name.includes(search) ||
        p.category.includes(search) ||
        (p.tags || []).some(t => t.includes(search))
      )
    : baselist;

  return (
    <div className="sec" id="sprods">
      <h2 className="stitle sa su" id="ptit">{activeCat === "سب" ? "تمام پرزے" : activeCat}</h2>
      <div className="srchbar">
        <span className="srchic">🔍</span>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="پرزہ تلاش کریں... (نام، قسم، ٹیگ)"
        />
        {search && <button className="srchclear" onClick={() => setSearch("")}>✕</button>}
      </div>
      {search && <div className="srch-count">{list.length} نتائج ملے</div>}
      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onAddCart={onAddCart} />}
      {!list.length
        ? <div className="no-results"><div className="nr-icon">{search ? "🔍" : "📦"}</div><div>{search ? `"${search}" کے لیے کوئی پرزہ نہیں ملا` : "اس قسم میں کوئی پرزہ نہیں"}</div></div>
        : <div className="pgrid">
          {list.map((p, i) => {
            const isSold = p.status === "sold";
            const isSel = selected.has(p.id);
            return (
              <div key={p.id} className={`pcard sa ss${isSel ? " sel" : ""}${isSold ? " sold-card" : ""}`} style={{ transitionDelay: `${Math.min(i * .06, .6)}s` }} onClick={() => setSelectedProduct(p)}>
                {p.imgUrl
                  ? <img src={p.imgUrl} alt={p.name} className="pimg" />
                  : <div className="pimg-placeholder">🔩</div>
                }
                <span className={`pbadge ${isSold ? "bsold" : "bin"}`}>{isSold ? "❌ فروخت شدہ" : "✅ دستیاب"}</span>
                <div className="pname">{p.name}</div>
                <span className="ptag0">{p.category}</span>
                {p.price ? <div className="pprice">Rs. {p.price.toLocaleString()}</div> : <div className="pprice-na">قیمت دریافت کریں</div>}
                {p.tags?.length > 0 && <div className="ptags">{p.tags.map((t, ti) => <span key={ti} className="ptag">{t}</span>)}</div>}
                <div className="prow">
                  <label className="chkw" onClick={e => { e.stopPropagation(); onToggleSelect(p.id); }}>
                    <div className={`chkb${isSel ? " checked" : ""}`}>{isSel && <span style={{ color: "white", fontSize: 12 }}>✓</span>}</div>
                    <span style={{ fontFamily: "var(--font)", fontSize: ".85rem", color: "#777" }}>منتخب</span>
                  </label>
                  <button className="ac2" onClick={e => { e.stopPropagation(); onAddCart(p.id); }} disabled={isSold}>{isSold ? "ناقابل" : "🛒 کارٹ"}</button>
                </div>
              </div>
            );
          })}
        </div>
      }
    </div>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────
function About() {
  return (
    <div className="sec" id="sabt">
      <h2 className="stitle sa su">ہمارے بارے میں</h2>
      <div className="agrid">
        <div className="ocard gl sa sl">
          <div className="oph">👤</div>
          <div className="oname">میاں نازک فرید اعوان</div>
          <div className="orole">میاں صاحب — 555 فاریور آٹوز</div>
          <div className="obio">پندرہ سال سے زائد عرصے سے ٹرک پارٹس کی صنعت میں خدمات انجام دے رہے ہیں۔ علی پور اور اردگرد کے علاقوں میں سب سے قابل اعتماد نام۔</div>
        </div>
        <div className="atxt sa sr">
          <h3>555 فاریور آٹوز کا تعارف</h3>
          <p>555 فاریور آٹوز علی پور کی سب سے بڑی اور قابل بھروسہ ٹرک پارٹس کی دکان ہے۔ ہم مزدا بیڈفورڈ، ہینو، نسان اور دیگر تمام برانڈ کے ٹرکوں کے اصل اور معیاری پرزے فراہم کرتے ہیں۔</p><br />
          <p>پندرہ سال سے زائد عرصے سے ہمارا ایک ہی مقصد ہے: آپ کا ٹرک جلد از جلد روڈ پر واپس لانا — اور وہ بھی معیاری پرزوں کے ساتھ۔</p><br />
          <p>📍 تحصیل کالج چوک، لال مارکیٹ، علی پور</p>
          <p>📞 <a href="tel:+923001974040" style={{ color: "var(--red)", textDecoration: "none" }} className="ltr">+92 300-1974040</a></p>
          <p>🕐 چوبیس گھنٹے، ساتوں دن</p>
        </div>
      </div>
    </div>
  );
}

// ─── Workers ──────────────────────────────────────────────────────────────────
function Workers() {
  const workers = [
    { av: "🌟", name: "استاد سلیم", rip: "مرحوم — اللہ کی رحمت ان پر", desc: "استاد سلیم مرحوم ہماری دکان کے بانی کاریگر تھے۔ ان کا ہاتھ لگتا تھا تو بند انجن چل پڑتا تھا۔ اللہ انہیں جنت الفردوس میں جگہ عطا فرمائے، آمین۔" },
    { av: "🔧", name: "استاد ربو", desc: "استاد ربو بریک اور سسپنشن کے بادشاہ ہیں۔ تیس سال سے زائد عرصے کا تجربہ رکھتے ہیں۔ ان کے ہاتھ کا کام دیکھ کر ہر کوئی حیران رہ جاتا ہے۔" },
    { av: "⚡", name: "استاد حسین", desc: "استاد حسین برقی نظام کے ماہر الیکٹریشن ہیں۔ وائرنگ، فیوز، الٹرنیٹر، اسٹارٹر — ہر برقی مسئلے کا حل ان کے ہاتھ میں ہے۔" },
    { av: "⚙️", name: "استاد عارف", desc: "برقی نظام کے ماہر — استاد عارف۔ وائرنگ سے لے کر الٹرنیٹر تک، ہر برقی مسئلے کا حل ان کے پاس ہے۔" },
    { av: "🔩", name: "استاد رمضان", desc: "استاد رمضان گیئر باکس اور ٹرانسمیشن کے ماہر ہیں۔ دور دور سے لوگ ان کے پاس ٹرک لے کر آتے ہیں۔" },
    { av: "🛠️", name: "استاد ماااانو", desc: "استاد ماااانو باڈی ورک اور ویلڈنگ میں بے مثال ہیں۔ ٹوٹی ہوئی چیسی ہو یا ٹوٹا ہوا فریم، ان کے ہاتھ لگنے سے سب درست ہو جاتا ہے۔" },
    { av: "🏗️", name: "استاد ملا", desc: "استاد ملا پمپ اور ہائیڈرولک سسٹم کے ماہر ہیں۔ جو کام بڑے بڑے ورکشاپ نہ کر سکیں، وہ کر دیتے ہیں۔" },
    { av: "🔑", name: "استاد صابر", desc: "استاد صابر اسٹیئرنگ اور ایگزاسٹ سسٹم کے ماہر ہیں۔ انیس سال سے اس دکان سے وابستہ ہیں اور ہر گاہک کو اپنا سمجھتے ہیں۔" },
  ];
  return (
    <div className="sec" id="swrk">
      <h2 className="stitle sa su">ہمارے ماہر کاریگر</h2>
      <div className="wgrid">
        {workers.map((w, i) => (
          <div key={i} className="wcard gl sa su" style={{ transitionDelay: `${i * .08}s` }}>
            <div className="wav">{w.av}</div>
            <div className="wname">{w.name}{w.rip && <span className="wrip">{w.rip}</span>}</div>
            <div className="wdesc">{w.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact() {
  return (
    <div className="sec" id="scon">
      <h2 className="stitle sa su">رابطہ کریں</h2>
      <div className="kgrid">
        <div className="kcard gl sa sl">
          <div className="kitem"><div className="kic">📍</div><div><div className="klbl">پتہ</div><div className="kval">تحصیل کالج چوک، لال مارکیٹ، علی پور</div></div></div>
          <div className="kitem"><div className="kic">👤</div><div><div className="klbl">میاں صاحب</div><div className="kval">میاں نازک فرید اعوان</div></div></div>
          <div className="kitem"><div className="kic">📞</div><div><div className="klbl">پہلا نمبر</div><a href="tel:+923001974040" className="kval ltr" style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center", gap: 8 }}>+92 300-1974040 <span style={{ fontSize: ".72rem", background: "rgba(0,180,0,.1)", color: "#008800", border: "1px solid rgba(0,180,0,.2)", borderRadius: 20, padding: "2px 8px", fontFamily: "var(--font)" }}>کال کریں</span></a></div></div>
          <div className="kitem"><div className="kic">📱</div><div><div className="klbl">دوسرا نمبر</div><a href="tel:+923008529697" className="kval ltr" style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center", gap: 8 }}>+92 300-8529697 <span style={{ fontSize: ".72rem", background: "rgba(0,180,0,.1)", color: "#008800", border: "1px solid rgba(0,180,0,.2)", borderRadius: 20, padding: "2px 8px", fontFamily: "var(--font)" }}>کال کریں</span></a></div></div>
          <div className="kitem"><div className="kic">🕐</div><div><div className="klbl">اوقات کار</div><div className="kval">چوبیس گھنٹے، ساتوں دن</div><div className="livedot"><div className="dotblink" /> ابھی کھلا ہے</div></div></div>
          <a href="tel:+923001974040" className="callbtn">📞 ابھی کال کریں</a>
          <a href={`https://wa.me/923001974040?text=${encodeURIComponent("السلام علیکم میاں صاحب!")}`} target="_blank" rel="noreferrer" className="wabtn">💬 واٹس ایپ پر میسج کریں</a>
        </div>
        <div className="mapbox gl sa sr">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55196.0!2d71.21!3d29.38!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sAlipur%2C+Punjab!5e0!3m2!1sen!2s!4v1" allowFullScreen loading="lazy" title="555 Forever Autos" />
        </div>
      </div>
    </div>
  );
}

// ─── Cart Panel ───────────────────────────────────────────────────────────────
function CartPanel({ open, cart, onClose, onQty, onDelete, onWA, onClear }) {
  const total = cart.reduce((a, c) => a + c.qty, 0);
  return (
    <>
      {open && <div className="cov" onClick={onClose} />}
      <div id="cpanel" style={{ left: open ? 0 : -420, transition: "left .4s cubic-bezier(0.4,0,0.2,1)" }}>
        <div className="chdr"><span className="cttl">🛒 میری کارٹ</span><button className="ccls" onClick={onClose}>✕</button></div>
        <div className="clist">
          {!cart.length
            ? <div className="cempty"><div style={{ fontSize: "3rem" }}>🛒</div><div>کارٹ خالی ہے</div></div>
            : cart.map(it => (
              <div key={it.id} className="citem">
                <div className="cinf"><div className="cinm">{it.name}</div><div className="cicat">{it.category}</div>{it.price && <span className="ciprice">Rs. {(it.price * it.qty).toLocaleString()}</span>}</div>
                <div className="ciqty">
                  <button className="qbtn" onClick={() => onQty(it.id, -1)}>−</button>
                  <span className="qnum">{it.qty}</span>
                  <button className="qbtn" onClick={() => onQty(it.id, 1)}>+</button>
                </div>
                <button className="cdel" onClick={() => onDelete(it.id)}>🗑</button>
              </div>
            ))
          }
        </div>
        <div className="cfoot">
          {cart.length > 0 && (() => {
            const subtotal = cart.reduce((a, c) => a + (c.price || 0) * c.qty, 0);
            const hasPrices = cart.some(c => c.price);
            return (
              <>
                {hasPrices && (
                  <div className="cart-subtotal">
                    {cart.map(it => it.price ? (
                      <div key={it.id} className="cart-subtotal-row">
                        <span className="cart-subtotal-lbl">{it.name} × {it.qty}</span>
                        <span className="cart-subtotal-val">Rs. {(it.price * it.qty).toLocaleString()}</span>
                      </div>
                    ) : null)}
                    <div className="cart-subtotal-row">
                      <span className="cart-subtotal-lbl">کل رقم</span>
                      <span className="cart-subtotal-total">Rs. {subtotal.toLocaleString()}</span>
                    </div>
                  </div>
                )}
                <div className="csum">{total} اشیاء — {cart.length} قسم</div>
                <button className="cart-clear" onClick={onClear}>🗑️ کارٹ خالی کریں</button>
              </>
            );
          })()}
          <button className="cwabtn" onClick={onWA} disabled={!cart.length} style={{opacity: cart.length ? 1 : .5, cursor: cart.length ? 'pointer' : 'not-allowed'}}>📱 واٹس ایپ پر دریافت</button>
        </div>
      </div>
    </>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
function Dashboard({ products, gallery, onSaveProduct, onToggleStatus, onDeleteProduct, onUploadGallery, onDeleteGallery }) {
  const [form, setForm] = useState({ name: "", category: "انجن", tags: "", status: "in-stock" });
  const [editId, setEditId] = useState(null);
  const [imgFile, setImgFile] = useState(null);
  const [upProg, setUpProg] = useState("");
  const [dgCap, setDgCap] = useState("");

  const handleSave = async () => {
    if (!form.name.trim()) return;
    const tags = form.tags.split(/،|,/).map(t => t.trim()).filter(Boolean);
    let imgUrl = null;
    if (imgFile) { try { const r = ref(storage, `products/${Date.now()}_${imgFile.name}`); const sn = await uploadBytes(r, imgFile); imgUrl = await getDownloadURL(sn.ref); } catch { imgUrl = await b64(imgFile); } }
    onSaveProduct({ ...form, tags, price: form.price ? Number(form.price) : null, imgUrl, editId });
    setForm({ name: "", category: "انجن", tags: "", status: "in-stock" }); setEditId(null); setImgFile(null);
  };
  const startEdit = (p) => {
    setEditId(p.id); setForm({ name: p.name, category: p.category, tags: (p.tags || []).join("، "), status: p.status, price: p.price || "" });
    document.getElementById("odash")?.scrollIntoView({ behavior: "smooth" });
  };
  const dUpGal = async (files) => {
    const arr = Array.from(files);
    setUpProg(`اپلوڈ ہو رہا ہے 0/${arr.length}`);
    for (let i = 0; i < arr.length; i++) {
      setUpProg(`اپلوڈ: ${arr[i].name} (${i + 1}/${arr.length})`);
      try { const r2 = ref(storage, `gallery/${Date.now()}_${arr[i].name}`); const sn = await uploadBytes(r2, arr[i]); onUploadGallery([{ id: "g_" + Date.now() + i, url: await getDownloadURL(sn.ref), caption: dgCap }]); }
      catch { onUploadGallery([{ id: "g_" + Date.now() + i, url: await b64(arr[i]), caption: dgCap }]); }
    }
    setUpProg(`✅ ${arr.length} تصویر(یں) اپلوڈ ہو گئیں`); setDgCap("");
    setTimeout(() => setUpProg(""), 2500);
  };

  return (
    <div id="odash" style={{ background: "rgba(248,244,244,.5)", padding: "60px 30px", borderTop: "2px solid rgba(204,0,0,.1)" }}>
      <div style={{ maxWidth: 1300, margin: "0 auto" }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontFamily: "var(--font)", fontSize: "1.8rem", color: "var(--red)", fontWeight: 700 }}>👑 میاں صاحب کا ڈیش بورڈ</div>
          <div style={{ fontFamily: "var(--font)", fontSize: ".9rem", color: "#888", marginTop: 4 }}>پرزے شامل کریں، تصاویر مینیج کریں، اسٹاک کنٹرول کریں</div>
        </div>
        {/* Stats */}
        <div className="dstats">
          {[["🔩", products.length, "کل پرزے"], ["✅", products.filter(p => p.status === "in-stock").length, "دستیاب"], ["❌", products.filter(p => p.status === "sold").length, "فروخت"], ["📷", gallery.length, "تصاویر"]].map(([ic, n, l], i) => (
            <div key={i} className="statc sa ss" style={{ transitionDelay: `${i * .06}s` }}>
              <div className="stic">{ic}</div><div><div className="stnum">{n}</div><div className="stlbl">{l}</div></div>
            </div>
          ))}
        </div>
        {/* Add Form */}
        <div className="dpanel sa su">
          <div className="ptitle">➕ {editId ? "پرزہ ترمیم کریں" : "نیا پرزہ شامل کریں"}</div>
          <div className="aform">
            <div className="fg"><label className="fglbl">پرزے کا نام</label><input className="fginp" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="مثلاً: ایئر فلٹر ہینو" /></div>
            <div className="fg"><label className="fglbl">قسم</label>
              <select className="fgsel" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                {["انجن", "بریک", "سسپنشن", "برقی", "باڈی پارٹس", "دیگر"].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="fg"><label className="fglbl">ٹیگز (کامے سے)</label><input className="fginp" value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} placeholder="مثلاً: ہینو، مزدا" /></div>
            <div className="fg"><label className="fglbl">قیمت (روپے)</label><input className="fginp" type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} placeholder="مثلاً: 1500" style={{direction:"ltr"}} /></div>
            <div className="fg"><label className="fglbl">حالت</label>
              <select className="fgsel" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                <option value="in-stock">دستیاب</option><option value="sold">فروخت شدہ</option>
              </select>
            </div>
            <div className="fg full"><label className="fglbl">تصویر (اختیاری)</label><input type="file" className="fginp" accept="image/*" onChange={e => setImgFile(e.target.files[0])} /></div>
            <div className="fg full" style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button className="svbtn" onClick={handleSave}>{editId ? "✏️ اپڈیٹ کریں" : "✅ شامل کریں"}</button>
              {editId && <button className="cxbtn" onClick={() => { setEditId(null); setForm({ name: "", category: "انجن", tags: "", status: "in-stock" }); }}>منسوخ</button>}
            </div>
          </div>
        </div>
        {/* Table */}
        <div className="dpanel sa su" style={{ transitionDelay: ".1s" }}>
          <div className="ptitle">📋 تمام پرزے <span style={{ fontFamily: "Arial,sans-serif", fontSize: ".8rem", color: "#aaa", fontWeight: 400, marginRight: "auto" }}>({products.length})</span></div>
          <div style={{ overflowX: "auto" }}>
            <table className="ptbl">
              <thead><tr><th>نام</th><th>قسم</th><th>ٹیگز</th><th>حالت</th><th>عمل</th></tr></thead>
              <tbody>
                {!products.length
                  ? <tr><td colSpan={5} style={{ textAlign: "center", padding: 50, fontFamily: "var(--font)", color: "#aaa" }}>کوئی پرزہ نہیں</td></tr>
                  : products.map(p => (
                    <tr key={p.id}>
                      <td style={{ fontWeight: 700, fontFamily: "var(--font)" }}>{p.name}</td>
                      <td><span className="tcat">{p.category}</span></td>
                      <td>{(p.tags || []).map((t, i) => <span key={i} style={{ padding: "2px 7px", background: "rgba(255,102,0,.08)", borderRadius: 10, fontSize: ".75rem", color: "var(--org)", marginLeft: 3 }}>{t}</span>)}</td>
                      <td><span className={p.status === "in-stock" ? "tin" : "tsold"}>{p.status === "in-stock" ? "✅ دستیاب" : "❌ فروخت"}</span></td>
                      <td><div className="tacts">
                        <button className="tsm ted" onClick={() => startEdit(p)}>✏️</button>
                        <button className="tsm ttg" onClick={() => onToggleStatus(p.id)}>{p.status === "in-stock" ? "فروخت" : "دستیاب"}</button>
                        <button className="tsm tdl" onClick={() => onDeleteProduct(p.id)}>🗑️</button>
                      </div></td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
        {/* Gallery Manager */}
        <div className="dpanel sa su" style={{ transitionDelay: ".2s" }}>
          <div className="ptitle">📷 گیلری مینیجر</div>
          <label className="gupa">
            <input type="file" accept="image/*" multiple style={{ display: "none" }} onChange={e => dUpGal(e.target.files)} />
            <div style={{ fontSize: "2.5rem", marginBottom: 8 }}>📸</div>
            <div style={{ fontFamily: "var(--font)", fontSize: "1rem", color: "#888" }}>یہاں کلک کریں<br /><span style={{ color: "var(--red)", fontWeight: 600 }}>تصاویر منتخب کریں</span></div>
          </label>
          <div style={{ marginBottom: 14 }}><label className="fglbl">عنوان</label><input className="fginp" value={dgCap} onChange={e => setDgCap(e.target.value)} placeholder="مثلاً: دکان کا منظر" style={{ marginTop: 6 }} /></div>
          {upProg && <div style={{ fontFamily: "var(--font)", fontSize: ".85rem", color: "#888", marginBottom: 10 }}>{upProg}</div>}
          <h3 style={{ fontFamily: "var(--font)", fontSize: ".95rem", color: "#666", margin: "18px 0 10px" }}>موجودہ تصاویر</h3>
          <div className="gthumbs">
            {!gallery.length
              ? <div style={{ fontFamily: "var(--font)", color: "#bbb", fontSize: ".9rem", padding: 16 }}>ابھی کوئی تصویر نہیں</div>
              : gallery.map(g => (
                <div key={g.id} className="gthumb">
                  <button className="gtdel" onClick={() => onDeleteGallery(g.id)}>✕</button>
                  <img src={g.url} alt={g.caption || ""} />
                  {g.caption && <div className="gtcap">{g.caption}</div>}
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer({ onCat }) {
  return (
    <footer>
      <div className="fgrd">
        <div>
          <div className="f555">555</div>
          <div className="fnm">فاریور آٹوز — ٹرک پارٹس</div>
          <div className="fdsc">علی پور کی سب سے قابل بھروسہ ٹرک پارٹس کی دکان۔ مزدا بیڈفورڈ، ہینو، نسان کے اصل پرزے۔</div>
        </div>
        <div>
          <div className="fttl">اقسام</div>
          <ul className="flinks">{["انجن", "بریک", "سسپنشن", "برقی", "باڈی پارٹس"].map(c => <li key={c}><a onClick={() => onCat(c)}>{c}</a></li>)}</ul>
        </div>
        <div>
          <div className="fttl">فوری لنک</div>
          <ul className="flinks">
            <li><a onClick={() => window.scrollTo(0, 0)}>ہوم</a></li>
            <li><a onClick={() => scrollTo("sgal")}>گیلری</a></li>
            <li><a onClick={() => scrollTo("sabt")}>ہمارے بارے میں</a></li>
            <li><a onClick={() => scrollTo("swrk")}>کاریگر</a></li>
            <li><a onClick={() => scrollTo("scon")}>رابطہ</a></li>
          </ul>
        </div>
        <div>
          <div className="fttl">رابطہ</div>
          <div className="fci">📍 لال مارکیٹ، علی پور</div>
          <div className="fci"><a href="tel:+923001974040" style={{ color: "inherit", textDecoration: "none" }} className="ltr">📞 +92 300-1974040</a></div>
          <div className="fci"><a href="tel:+923008529697" style={{ color: "inherit", textDecoration: "none" }} className="ltr">📱 +92 300-8529697</a></div>
          <div className="fci">🕐 چوبیس گھنٹے کھلا</div>
        </div>
      </div>
      <div className="fbot">© 2025 555 فاریور آٹوز — تمام حقوق محفوظ ہیں | علی پور، پنجاب، پاکستان</div>
    </footer>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [products, setProducts] = useState(() => {
    const saved = ls.get("555p", null);
    // If saved products exist but have no prices, reset to demo products with prices
    if (!saved || !saved.length || !saved.some(p => p.price)) {
      ls.set("555p", [...DEMO_PRODUCTS]);
      return [...DEMO_PRODUCTS];
    }
    return saved;
  });
  const [cart, setCart] = useState([]);
  const [gallery, setGallery] = useState(() => ls.get("555g", []));
  const [selected, setSelected] = useState(new Set());
  const [activeCat, setActiveCat] = useState("سب");
  const [isOwner, setIsOwner] = useState(() => ls.get("555s", "") === "ok");
  const [cartOpen, setCartOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const [notif, setNotif] = useState({ msg: "", type: "ok" });
  const [showTop, setShowTop] = useState(false);
  const [loginForm, setLoginForm] = useState({ user: "", pass: "" });
  const [loginErr, setLoginErr] = useState(false);

  useScrollAnim();
  useGoogleTranslateFix();
  useEscKey([() => setCartOpen(false), () => setLoginOpen(false), () => setLightbox(null)]);

  useEffect(() => { setTimeout(() => setLoaded(true), 1800); }, []);
  useEffect(() => { ls.set("555p", products); }, [products]);
  useEffect(() => { ls.set("555g", gallery); }, [gallery]);
  useEffect(() => { const fn = () => setShowTop(window.scrollY > 400); window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn); }, []);

  const notify = useCallback((msg, type = "ok") => setNotif({ msg, type }), []);
  const cartCount = cart.reduce((a, c) => a + c.qty, 0);

  const handleCat = (id) => { setActiveCat(id); scrollTo("sprods"); };
  const handleToggleSelect = (id) => { setSelected(s => { const ns = new Set(s); ns.has(id) ? ns.delete(id) : ns.add(id); return ns; }); };
  const handleAddCart = (id) => {
    const p = products.find(x => x.id === id); if (!p) return;
    setCart(c => { const ex = c.find(x => x.id === id); return ex ? c.map(x => x.id === id ? { ...x, qty: x.qty + 1 } : x) : [...c, { id, name: p.name, category: p.category, price: p.price || null, qty: 1 }]; });
    notify(p.name, "ok");
  };
  const handleCartQty = (id, d) => setCart(c => c.map(x => x.id === id ? { ...x, qty: Math.max(1, x.qty + d) } : x));
  const handleCartDelete = (id) => setCart(c => c.filter(x => x.id !== id));
  const handleWA = () => {
    if (!cart.length) return;
    const items = cart.map(c => `• ${c.name} | قسم: ${c.category} | تعداد: ${c.qty}${c.price ? ` | قیمت: Rs. ${(c.price * c.qty).toLocaleString()}` : ""}`).join("\n");
    const subtotal = cart.reduce((a, c) => a + (c.price || 0) * c.qty, 0);
    const total = cart.reduce((a, c) => a + c.qty, 0);
    const msg = `السلام علیکم میاں صاحب! 🙏\n\nمجھے درج ذیل ${total} پرزوں کی ضرورت ہے:\n\n${items}\n\n━━━━━━━━━━━━\n${subtotal > 0 ? `تخمینی کل: Rs. ${subtotal.toLocaleString()}\n` : ""}براہ کرم دستیابی کی تصدیق کریں۔\nشکریہ 🚛`;
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, "_blank");
  };
  const handleLogin = async () => {
    if (loginForm.user === OU && loginForm.pass === OP) {
      ls.set("555s", "ok"); setIsOwner(true); setLoginOpen(false); setLoginErr(false);
      notify("✅ میاں صاحب! خوش آمدید", "ok");
      try { await signInWithEmailAndPassword(auth, "mianalpha@555forever.com", "alipur786"); } catch {}
    } else { setLoginErr(true); setLoginForm(f => ({ ...f, pass: "" })); }
  };
  const handleLogout = async () => { ls.set("555s", ""); setIsOwner(false); notify("👋 لاگ آؤٹ ہو گئے", "ok"); try { await signOut(auth); } catch {} };
  const handleSaveProduct = ({ name, category, tags, status, price, imgUrl, editId }) => {
    if (editId) { setProducts(p => p.map(x => x.id === editId ? { ...x, name, category, tags, status, price, ...(imgUrl && { imgUrl }) } : x)); notify(`✅ "${name}" اپڈیٹ ہوا`, "ok"); }
    else { setProducts(p => [...p, { id: "p_" + Date.now(), name, category, tags, status, price, ...(imgUrl && { imgUrl }) }]); notify(`✅ "${name}" شامل کر دیا`, "ok"); }
  };
  const handleToggleStatus = (id) => { setProducts(p => p.map(x => x.id === id ? { ...x, status: x.status === "in-stock" ? "sold" : "in-stock" } : x)); notify("✅ حالت تبدیل ہوئی", "ok"); };
  const handleDeleteProduct = (id) => { if (!confirm("حذف کریں؟")) return; setProducts(p => p.filter(x => x.id !== id)); notify("🗑️ پرزہ حذف ہو گیا", "ok"); };
  const handleUploadGallery = async (files, cap) => {
    const newItems = [];
    for (const f of files) {
      try { const r = ref(storage, `gallery/${Date.now()}_${f.name}`); const sn = await uploadBytes(r, f); newItems.push({ id: "g_" + Date.now(), url: await getDownloadURL(sn.ref), caption: cap }); }
      catch { newItems.push({ id: "g_" + Date.now(), url: await b64(f), caption: cap }); }
    }
    setGallery(g => [...g, ...newItems]); notify(`✅ ${files.length} تصویر(یں) شامل`, "ok");
  };
  const handleUploadGalleryItems = (items) => setGallery(g => [...g, ...items]);
  const handleDeleteGallery = (id) => { if (!confirm("تصویر حذف کریں؟")) return; setGallery(g => g.filter(x => x.id !== id)); notify("🗑️ تصویر حذف ہو گئی", "ok"); };

  return (
    <>
      <style>{CSS}</style>
      <Loader done={loaded} />
      <div className="orb o1" /><div className="orb o2" /><div className="orb o3" />
      <Navbar isOwner={isOwner} cartCount={cartCount} onCart={() => setCartOpen(true)} onLogin={() => setLoginOpen(true)} onLogout={handleLogout} onCat={handleCat} onDash={() => scrollTo("odash")} />

      {/* Login Modal */}
      {loginOpen && (
        <div style={{ display: "flex", position: "fixed", inset: 0, zIndex: 3000, background: "rgba(0,0,0,.85)", backdropFilter: "blur(20px)", alignItems: "center", justifyContent: "center" }}>
          <div className="lbox">
            <button className="lcls" onClick={() => { setLoginOpen(false); setLoginErr(false); }}>✕</button>
            <div className="l555">555</div>
            <div className="ltit">میاں صاحب لاگ ان</div>
            <div className="lform">
              <input className="linp" value={loginForm.user} onChange={e => setLoginForm(f => ({ ...f, user: e.target.value }))} placeholder="صارف نام" onKeyDown={e => e.key === "Enter" && handleLogin()} />
              <input type="password" className="linp" value={loginForm.pass} onChange={e => setLoginForm(f => ({ ...f, pass: e.target.value }))} placeholder="پاس ورڈ" onKeyDown={e => e.key === "Enter" && handleLogin()} />
              {loginErr && <div className="lerr">غلط صارف نام یا پاس ورڈ</div>}
              <button className="lbtn" onClick={handleLogin}>داخل ہوں</button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Deselect */}
      {confirmOpen && (
        <div style={{ display: "flex", position: "fixed", inset: 0, zIndex: 4000, background: "rgba(0,0,0,.5)", backdropFilter: "blur(10px)", alignItems: "center", justifyContent: "center" }}>
          <div className="cfbox">
            <div className="cfic">⚠️</div><div className="cftt">تصدیق</div>
            <div className="cfmsg">کیا آپ تمام منتخب اشیاء ہٹانا چاہتے ہیں؟</div>
            <div className="cfbtns">
              <button className="cfy" onClick={() => { setSelected(new Set()); setConfirmOpen(false); notify("✅ تمام انتخاب ہٹا دیے گئے", "ok"); }}>ہاں، ہٹائیں</button>
              <button className="cfn" onClick={() => setConfirmOpen(false)}>نہیں</button>
            </div>
          </div>
        </div>
      )}

      <CartPanel open={cartOpen} cart={cart} onClose={() => setCartOpen(false)} onQty={handleCartQty} onDelete={handleCartDelete} onWA={handleWA} onClear={() => { setCart([]); notify('🗑️ کارٹ خالی ہو گئی', 'ok'); }} />
      {selected.size > 0 && (
        <div id="dbar"><span style={{ fontFamily: "var(--font)" }}>{selected.size} اشیاء منتخب</span><button className="dbtn" onClick={() => setConfirmOpen(true)}>🗑️ سب ہٹائیں</button></div>
      )}

      {notif.msg && <Notif msg={notif.msg} type={notif.type} onDone={() => setNotif({ msg: "", type: "ok" })} onCartClick={() => setCartOpen(true)} />}
      {showTop && <button id="topbtn" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>↑</button>}
      <Lightbox img={lightbox?.img} cap={lightbox?.cap} onClose={() => setLightbox(null)} />

      <Hero />
      <Gallery gallery={gallery} isOwner={isOwner} onUpload={handleUploadGallery} onDelete={handleDeleteGallery} onLightbox={(img, cap) => setLightbox({ img, cap })} />
      <Features />
      <Categories products={products} activeCat={activeCat} selected={selected} onCat={handleCat} />
      <Products products={products} activeCat={activeCat} selected={selected} onToggleSelect={handleToggleSelect} onAddCart={handleAddCart} />
      <About />
      <Workers />
      <Contact />
      {isOwner && <Dashboard products={products} gallery={gallery} onSaveProduct={handleSaveProduct} onToggleStatus={handleToggleStatus} onDeleteProduct={handleDeleteProduct} onUploadGallery={handleUploadGallery} onDeleteGallery={handleDeleteGallery} />}
      <Footer onCat={handleCat} />
    </>
  );
}
