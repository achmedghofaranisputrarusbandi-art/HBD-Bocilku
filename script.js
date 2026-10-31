/* ========= EDIT DI SINI ========= */
const CFG={
 nama:"Bocillkuu Sipaa", dari:"Cowokmu yang paling sabar",
 lagu:"", // kosong = nada Happy Birthday bawaan. Mau lagu sendiri? taruh mp3 di assets/ lalu isi, contoh: "assets/lagu.mp3"
 surat:`Hai ${"Bocillkuu Sipaa"} 💙

Selamat ulang tahun, ya! Hari ini dunia resmi nambah satu orang yang cantik, pintar, dan sedikit galak kalau lapar.

Makasih udah sabar sama aku, udah mau dengerin cerita nggak penting berjam-jam, dan udah jadi alasan aku senyum-senyum sendiri di depan HP.

Kamu tuh kayak alarm yang aku nggak mau di-snooze. Satu "udah makan belum?" dari kamu bisa bikin hari yang capek jadi ringan.

Doaku sederhana: sehat, bahagia, rezeki lancar, dan semua mimpimu pelan-pelan jadi nyata. Kalau boleh nambah, semoga aku masih jadi orang yang kamu cari pertama kali di tahun-tahun berikutnya.

Udah ya, nanti kamu bilang aku lebay. Tapi serius, aku sayang kamu. Banget.`,
 caption:["Senyum yang bikin aku lupa mau ngomong apa 😳","Boleh nggak dipajang di dinding kamarku?","Tatapan ini bahaya, aku kalah terus","Cantiknya nggak pake aba-aba, curang","Nopang dagu, aku yang salah tingkah","Ngantuk aja tetap gemes, gimana ini","Kacamata + senyum = paket komplit 💙","Julurin lidah, tapi aku yang kena mental 😛"],
 alasan:["Senyum kamu","Cerewet kamu yang bikin rame","Kamu sabar banget sama aku","Cara kamu peduli","Ketawa kamu yang nular","Kamu apa adanya","Kamu bikin aku pengen jadi lebih baik","Karena itu kamu. Titik."],
 hadiah:{judul:"Voucher Spesial 🎟️",isi:"Berlaku seumur hidup:<br>✔ Traktir makan apa saja<br>✔ 1x dengerin curhat tanpa nyela<br>✔ 1x peluk kalau lagi bete<br><br>Kejutan aslinya kukasih langsung ya 😘"},
 janji:["Selalu ada kalau kamu butuh","Sabar kalau kamu lagi ngambek","Ngingetin kamu makan (dan ikut makan)","Jadi tukang foto pribadimu","Sayang kamu, terus, tanpa syarat"],
 doa:["Semoga kamu sehat selalu","Semoga rezekimu lancar","Semoga cita-citamu tercapai","Semoga selalu dikelilingi orang baik","Semoga kita bareng terus 💙"],
 final:["Happy Birthday","{nama}","Semoga panjang umur 🌷","Sehat selalu, bahagia terus","Semua mimpimu jadi nyata ✨","Makasih udah lahir ke dunia ini","Aku sayang kamu 💙"]
};
/* ================================ */
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],R=Math.random;
/* ---- audio ---- */
let AC,MG,muted=false,nextT=0,A=CFG.lagu?new Audio(CFG.lagu):null;if(A)A.loop=true;
function ac(){try{if(!AC){AC=new(window.AudioContext||window.webkitAudioContext)();MG=AC.createGain();MG.gain.value=.55;MG.connect(AC.destination);nextT=AC.currentTime+.2}AC.state!=='running'&&AC.resume()}catch(e){}return AC}
const hz=m=>440*2**((m-69)/12);
function tone(f,t,d,ty='sine',v=.2){const o=AC.createOscillator(),g=AC.createGain();o.type=ty;o.frequency.value=f;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+.012);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(MG);o.start(t);o.stop(t+d+.05)}
function noise(d,f0,f1,v){const t=AC.currentTime,b=AC.createBuffer(1,AC.sampleRate*d,AC.sampleRate),a=b.getChannelData(0);for(let i=0;i<a.length;i++)a[i]=R()*2-1;const s=AC.createBufferSource(),f=AC.createBiquadFilter(),g=AC.createGain();s.buffer=b;f.type='lowpass';f.frequency.setValueAtTime(f0,t);f.frequency.exponentialRampToValueAtTime(f1,t+d);g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.001,t+d);s.connect(f);f.connect(g);g.connect(MG);s.start(t)}
const sfx=f=>{try{AC&&AC.state==='running'&&f()}catch(e){}};
const boom=()=>sfx(()=>{noise(.8,1500,50,.7);tone(70,AC.currentTime,.4,'sine',.5)}),pop=()=>sfx(()=>tone(700+R()*400,AC.currentTime,.12,'triangle',.25));
const stinger=()=>sfx(()=>{const t=AC.currentTime;tone(98,t,.5,'sawtooth',.35);tone(104,t,.5,'sawtooth',.35);tone(196,t+.01,.3,'square',.2)});
const siren=()=>sfx(()=>{const t=AC.currentTime;for(let i=0;i<6;i++)tone(i%2?640:880,t+i*.3,.28,'square',.12)});
const M=[[67,.75],[67,.25],[69,1],[67,1],[72,1],[71,2],[67,.75],[67,.25],[69,1],[67,1],[74,1],[72,2],[67,.75],[67,.25],[79,1],[76,1],[72,1],[71,1],[69,2],[77,.75],[77,.25],[76,1],[72,1],[74,1],[72,2]],BASS=[48,55,48,55,48,53,48,55,48,55,48,43],B=.46;
function loop(){if(!AC||A)return;if(AC.state==='running'&&nextT-AC.currentTime<1){let t=nextT;M.forEach(([m,d])=>{tone(hz(m),t,.9,'sine',.22);tone(hz(m+12),t,.5,'triangle',.07);t+=d*B});for(let i=0;i<12;i++)tone(hz(BASS[i]),nextT+i*2.1*B,1,'sine',.16);nextT=t+.6}}
setInterval(loop,400);
function music(){if(A){A.play().catch(()=>{});return}ac();loop()}
['pointerdown','touchstart','keydown','wheel'].forEach(e=>addEventListener(e,()=>{if(!muted){A?A.paused&&A.play().catch(()=>{}):ac()}},{passive:true}));
$('#mute').onclick=()=>{muted=!muted;$('#mute').textContent=muted?'🔇':'🔊';MG&&(MG.gain.value=muted?0:.55);A&&(muted?A.pause():A.play())};
try{music()}catch(e){}
/* ---- kembang api & konfeti ---- */
const cv=$('#fx'),c=cv.getContext('2d');let W,H,ps=[],rk=[];
const rs=()=>{W=cv.width=innerWidth;H=cv.height=innerHeight};rs();addEventListener('resize',rs);
function burst(x,y,type='sphere',h=R()*360){const n=type=='heart'?72:90;for(let i=0;i<n;i++){let vx,vy;if(type=='heart'){const t=i/n*6.283;vx=16*Math.sin(t)**3*.34;vy=-(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t))*.34}else{const a=R()*6.283,s=type=='ring'?6:1+R()*6.5;vx=Math.cos(a)*s;vy=Math.sin(a)*s}ps.push({x,y,vx,vy,g:.05,L:85+R()*35,l:85+R()*35,h:h+R()*35})}boom()}
function rocket(x=R()*W,ty=H*(.12+R()*.35),type){rk.push({x,y:H,vx:0,vy:-(H-ty)/42,f:0,tx:x,type:type||['sphere','sphere','ring','heart'][R()*4|0]});sfx(()=>noise(.5,3000,400,.15))}
const show=(n,gap=350)=>{for(let i=0;i<n;i++)setTimeout(()=>rocket(),i*gap)};
function conf(x=W/2,y=H/2,n=120){const C=['#f4a3b9','#2f4f8f','#7a4a3a','#ffd6e1','#8fb1ea','#ffe14d'];for(let i=0;i<n;i++){const a=R()*6.283,s=R()*13;ps.push({k:1,x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-5,l:100+R()*50,col:C[i%6],s:5+R()*6})}pop()}
(function frame(){c.clearRect(0,0,W,H);c.lineCap='round';
 rk=rk.filter(r=>{r.y+=r.vy;r.f++;ps.push({x:r.x,y:r.y,vx:0,vy:1,g:0,L:16,l:16,h:40,w:1.5});if(r.f>=42){burst(r.x,r.y,r.type);return false}return true});
 ps=ps.filter(p=>--p.l>0);for(const p of ps){if(p.k){p.vy+=.22;p.vx*=.99;p.x+=p.vx;p.y+=p.vy;c.globalAlpha=Math.min(1,p.l/25);c.fillStyle=p.col;c.fillRect(p.x,p.y,p.s,p.s*.6);c.globalAlpha=1}else{p.vx*=.96;p.vy=p.vy*.96+p.g;p.x+=p.vx;p.y+=p.vy;c.strokeStyle=`hsl(${p.h} 100% 62% / ${p.l/p.L})`;c.lineWidth=p.w||2.6;c.beginPath();c.moveTo(p.x-p.vx*2,p.y-p.vy*2);c.lineTo(p.x,p.y);c.stroke()}}
 requestAnimationFrame(frame)})();
function balloons(){const C=['#f4a3b9','#2f4f8f','#7a4a3a','#ffd6e1','#8fb1ea'];for(let i=0;i<16;i++){const b=document.createElement('div');b.className='bl';b.style.cssText=`left:${R()*92}%;background:${C[i%5]};animation-duration:${6+R()*5}s;animation-delay:${R()*2}s`;$('#balloons').append(b);setTimeout(()=>b.remove(),13000)}}
/* ---- isi halaman ---- */
$$('.nm').forEach(e=>e.textContent=CFG.nama);$('#sign').textContent='— '+CFG.dari;
CFG.caption.forEach((t,i)=>{const d=document.createElement('div');d.className='pola';d.style.setProperty('--r',(R()*8-4)+'deg');d.innerHTML=`<div class="pi"><div class="pf"><img src="assets/foto${i+1}.jpg" alt=""></div><div class="pb">${t}</div></div>`;d.onclick=()=>{d.classList.toggle('flip');pop()};$(i<4?'#p1':'#p2').append(d)});
CFG.alasan.forEach(t=>{const d=document.createElement('div');d.className='card';d.innerHTML=`<div><b>💙</b><i>${t}</i></div>`;d.onclick=()=>{d.classList.toggle('flip');const r=d.getBoundingClientRect();conf(r.x+r.width/2,r.y+r.height/2,25)};$('#cards').append(d)});
/* ---- kaget ---- */
let scareT;function scare(img,txt,cb){const s=$('#scare');$('#simg').src=img;$('#stxt').textContent=txt;s.classList.add('show');stinger();navigator.vibrate&&navigator.vibrate([120,60,200]);const close=()=>{s.classList.remove('show');clearTimeout(scareT);cb&&cb()};scareT=setTimeout(close,2600);s.onclick=close}
/* ---- bagian interaktif ---- */
$('#heart').onclick=e=>{burst(e.clientX,e.clientY,'heart',330);conf(e.clientX,e.clientY,40)};
let loaded=false;function loader(){if(loaded)return;loaded=true;const bar=$('#bar'),m=$('#lmsg');let p=0;const msg=[[20,'Mengumpulkan senyum kamu…'],[50,'Menghitung berapa kali aku kangen…'],[80,'Menambah dosis gemas…'],[97,'Hampir selesai…']];const iv=setInterval(()=>{p+=2;bar.style.width=p+'%';const x=msg.filter(a=>p>=a[0]).pop();x&&(m.textContent=x[1]);if(p>=97){clearInterval(iv);setTimeout(()=>{m.textContent='ERROR: kejutan nyasar 😅';$('#retry').hidden=false},700)}},60)}
$('#retry').onclick=()=>{$('#retry').hidden=true;scare('assets/foto8.jpg','DORRR! 😝 Kaget yaaa?!',()=>{$('#bar').style.width='100%';$('#lmsg').textContent='Berhasil! Kejutannya: kamu gemes banget 💙';show(6);conf();unlock()})};
let typed=false;function type(){if(typed)return;typed=true;const el=$('#letter'),S=CFG.surat;let i=0;(function n(){el.textContent=S.slice(0,i+=2);i<S.length?setTimeout(n,38):unlock()})();el.onclick=()=>{i=S.length}}
let nn=0;const no=$('#no'),NM=['Eits nggak bisa 😝','Salah pencet','Coba lagi deh','Tombolnya malu','Udah nyerah aja','Jawab yang bener 🥺','Ayo pilih "Iya" 💙'];
const dodge=e=>{e&&e.preventDefault();no.style.position='fixed';no.style.left=(10+R()*(innerWidth-110))+'px';no.style.top=(80+R()*(innerHeight-200))+'px';no.style.zIndex=60;$('#qmsg').textContent=NM[nn%NM.length];$('#yes').style.transform=`scale(${Math.min(2.2,1+ ++nn*.15)})`;pop()};
no.onmouseenter=dodge;no.ontouchstart=dodge;no.onclick=dodge;
$('#yes').onclick=()=>{no.style.display='none';$('#qmsg').textContent='Aku tau kok 😌 aku juga sayang kamu 💙';unlock();rocket(W/2,H*.3,'heart');show(5);conf()};
let left=5;for(let i=0;i<5;i++){const b=document.createElement('button');b.className='candle';b.onclick=()=>{if(b.classList.contains('off'))return;b.classList.add('off');pop();if(!--left){$('#wishmsg').textContent='Semoga semua wish kamu terkabul 🥹💙';show(4);conf();unlock()}else $('#wishmsg').textContent=`Tinggal ${left} lagi…`};$('#candles').append(b)}
$('#redbtn').onclick=()=>{siren();document.body.classList.add('flash');setTimeout(()=>document.body.classList.remove('flash'),2000);setTimeout(()=>scare('assets/foto1.jpg',`🚨 TERDETEKSI: ${CFG.nama} TERLALU GEMES 🚨`,()=>{show(7,250);conf();unlock()}),1300)};
$('#box').onclick=e=>{const b=e.currentTarget;if(b.classList.contains('open'))return;b.classList.add('open');setTimeout(()=>scare('assets/foto2.jpg','SURPRISE!! 🎉🎁',()=>{$('#prize').innerHTML=`<h3>${CFG.hadiah.judul}</h3>${CFG.hadiah.isi}`;$('#prize').classList.add('show');show(6);conf();unlock()}),500)};
/* ---- puncak: pesta kembang api ---- */
let party=0;$('#party').onclick=()=>{ac();const F=$('#finale'),I=$('#fimg'),T=$('#ftxt');F.classList.add('show');$('#fx-close').style.display='none';party=1;let i=0;const L=CFG.final.map(s=>s.replace('{nama}',CFG.nama));
 const step=()=>{if(!party)return;I.classList.remove('on');T.classList.remove('on');setTimeout(()=>{I.src=`assets/foto${i%8+1}.jpg`;T.textContent=L[i%L.length];I.classList.add('on');T.classList.add('on')},500);if(i==L.length-1){for(let k=0;k<5;k++)setTimeout(()=>rocket(W*(.15+k*.175),H*.3,'heart'),k*500);$('#fx-close').style.display='block'}i++;if(i<=L.length)setTimeout(step,5200)};step();
 const rain=setInterval(()=>{if(!party)return clearInterval(rain);show(2,200)},1100)};
const FN=$('#finale');FN.onclick=e=>{party&&rocket(e.clientX,e.clientY<H*.6?e.clientY:H*.3)};$('#fx-close').onclick=e=>{e.stopPropagation();party=0;FN.classList.remove('show');$('#fimg').classList.remove('on')};
/* ---- halaman ---- */
const PG=$$('.pg'),done={};let cur=-1,gi;
function lock(on){const n=$('#next');n.disabled=on;n.textContent=on?'🔒 Selesaikan dulu ya':'Lanjut ➜'}
function unlock(){done[PG[cur].id]=1;lock(false);conf(W/2,H*.75,40)}
const ENTER={load:()=>loader(),letterpg:()=>type(),game:()=>startGame(),doa:()=>buildSky(),janji:()=>buildJan(),
 gal1:()=>stag(),gal2:()=>stag()};
const stag=()=>$$('.act .pola').forEach((t,i)=>setTimeout(()=>t.classList.add('in'),i*250));
function go(i){i=Math.max(0,Math.min(PG.length-1,i));clearInterval(gi);PG.forEach((p,k)=>p.classList.toggle('act',k==i));cur=i;const p=PG[i];p.scrollTop=0;
 $('#prog i').style.width=(i+1)/PG.length*100+'%';$('#back').style.visibility=i?'visible':'hidden';$('#next').style.display=i==PG.length-1?'none':'';
 lock(!!p.dataset.lock&&!done[p.id]);ENTER[p.id]&&ENTER[p.id]()}
$('#next').onclick=()=>{pop();go(cur+1)};$('#back').onclick=()=>go(cur-1);$('#again').onclick=()=>location.reload();
function startGame(){if(done.game)return;let sc=0;const ar=$('#arena');ar.innerHTML='';$('#score').textContent='0 / 10';
 gi=setInterval(()=>{const h=document.createElement('button');h.className='hh';h.textContent=['💙','🩷','🤎'][R()*3|0];h.style.left=R()*80+'%';h.style.animationDuration=(3.5+R()*2)+'s';
  h.onclick=()=>{h.remove();pop();$('#score').textContent=++sc+' / 10';if(sc>=10){clearInterval(gi);ar.innerHTML='';$('#score').textContent='Hebat! Jago banget nangkap hatiku 🥹';unlock()}};ar.append(h);setTimeout(()=>h.remove(),6500)},600)}
let skyOk=0;function buildSky(){if(skyOk)return;skyOk=1;let n=0;[[10,10],[70,5],[40,40],[8,65],[75,60]].forEach(([x,y],i)=>{const b=document.createElement('button');b.className='st';b.textContent='⭐';b.style.cssText=`left:${x}%;top:${y}%`;b.onclick=()=>{if(b.classList.contains('lit'))return;b.classList.add('lit');$('#doamsg').textContent=CFG.doa[i];const r=b.getBoundingClientRect();burst(r.x+20,r.y+20,'sphere');if(++n==5)unlock()};$('#sky').append(b)})}
let janOk=0;function buildJan(){if(janOk)return;janOk=1;let n=0;CFG.janji.forEach(t=>{const b=document.createElement('button');b.textContent=t;b.onclick=()=>{if(b.classList.contains('ok'))return;b.classList.add('ok');pop();if(++n==CFG.janji.length){show(5);unlock()}};$('#jan').append(b)})}
/* ---- mulai ---- */
function start(){document.body.classList.add('on');go(0);conf(W/2,H/2,160);balloons();show(7,300);setTimeout(()=>lock(false),0)}
$('#go').onclick=()=>{music();ac();pop();$('#gate').classList.add('out');const k=$('#count');k.style.display='grid';let n=3;(function t(){if(!n){k.style.display='none';start();return}k.innerHTML=`<span>${n--}</span>`;pop();setTimeout(t,900)})()};
