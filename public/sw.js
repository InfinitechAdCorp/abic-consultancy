if (!self.define) {
  let e,
    a = {};
  const s = (s, i) => (
    (s = new URL(s + ".js", i).href),
    a[s] ||
      new Promise((a) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = s), (e.onload = a), document.head.appendChild(e);
        } else (e = s), importScripts(s), a();
      }).then(() => {
        let e = a[s];
        if (!e) throw new Error(`Module ${s} didn’t register its module`);
        return e;
      })
  );
  self.define = (i, n) => {
    const c =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (a[c]) return;
    let t = {};
    const r = (e) => s(e, c),
      d = { module: { uri: c }, exports: t, require: r };
    a[c] = Promise.all(i.map((e) => d[e] || r(e))).then((e) => (n(...e), t));
  };
}
define(["./workbox-899f6e77"], function (e) {
  "use strict";
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: "/_next/app-build-manifest.json",
          revision: "d174299989b1ea5aa935275a778e6655",
        },
        {
          url: "/_next/static/2dJVhPCHqdYxE5YkcS1fC/_buildManifest.js",
          revision: "4cd7b1fd9812c1f79beeb29c20eef5ea",
        },
        {
          url: "/_next/static/2dJVhPCHqdYxE5YkcS1fC/_ssgManifest.js",
          revision: "b6652df95db52feb4daf4eca35380933",
        },
        {
          url: "/_next/static/chunks/1328-d8908ece3778688f.js",
          revision: "d8908ece3778688f",
        },
        {
          url: "/_next/static/chunks/1377-0aa7f7dfef09cd34.js",
          revision: "0aa7f7dfef09cd34",
        },
        {
          url: "/_next/static/chunks/1559-668169c1b6cb7eea.js",
          revision: "668169c1b6cb7eea",
        },
        {
          url: "/_next/static/chunks/1764-4d2680b3339ad067.js",
          revision: "4d2680b3339ad067",
        },
        {
          url: "/_next/static/chunks/1923-c3f04ac460b7bd64.js",
          revision: "c3f04ac460b7bd64",
        },
        {
          url: "/_next/static/chunks/3042-2507d38ed8a1bc7e.js",
          revision: "2507d38ed8a1bc7e",
        },
        {
          url: "/_next/static/chunks/3409-9b3faf364080879c.js",
          revision: "9b3faf364080879c",
        },
        {
          url: "/_next/static/chunks/3496-f0327ca338fb82e0.js",
          revision: "f0327ca338fb82e0",
        },
        {
          url: "/_next/static/chunks/3649-cda2feff11122757.js",
          revision: "cda2feff11122757",
        },
        {
          url: "/_next/static/chunks/3720-45b5d4bbd3c94eb9.js",
          revision: "45b5d4bbd3c94eb9",
        },
        {
          url: "/_next/static/chunks/4053-23372f76b732d468.js",
          revision: "23372f76b732d468",
        },
        {
          url: "/_next/static/chunks/4358-5e2b66cd9d49c38e.js",
          revision: "5e2b66cd9d49c38e",
        },
        {
          url: "/_next/static/chunks/4432-01277b5bf0632978.js",
          revision: "01277b5bf0632978",
        },
        {
          url: "/_next/static/chunks/472.2c08b965bd9148e2.js",
          revision: "2c08b965bd9148e2",
        },
        {
          url: "/_next/static/chunks/4bd1b696-cc729d47eba2cee4.js",
          revision: "cc729d47eba2cee4",
        },
        {
          url: "/_next/static/chunks/5411-762a4b348fcb919a.js",
          revision: "762a4b348fcb919a",
        },
        {
          url: "/_next/static/chunks/5964-40978821a2ce41e4.js",
          revision: "40978821a2ce41e4",
        },
        {
          url: "/_next/static/chunks/6034-4f401872ae223575.js",
          revision: "4f401872ae223575",
        },
        {
          url: "/_next/static/chunks/6193-010137725b11e123.js",
          revision: "010137725b11e123",
        },
        {
          url: "/_next/static/chunks/6473-a344624aec219cf6.js",
          revision: "a344624aec219cf6",
        },
        {
          url: "/_next/static/chunks/6766-f263b6f3eeffd6b5.js",
          revision: "f263b6f3eeffd6b5",
        },
        {
          url: "/_next/static/chunks/711-3908be9dd676489c.js",
          revision: "3908be9dd676489c",
        },
        {
          url: "/_next/static/chunks/7146-89df004e416ad590.js",
          revision: "89df004e416ad590",
        },
        {
          url: "/_next/static/chunks/7212-f2ba0535fb969610.js",
          revision: "f2ba0535fb969610",
        },
        {
          url: "/_next/static/chunks/734-2b4e6efa8b876b8b.js",
          revision: "2b4e6efa8b876b8b",
        },
        {
          url: "/_next/static/chunks/7706-1be7ad2a867c095f.js",
          revision: "1be7ad2a867c095f",
        },
        {
          url: "/_next/static/chunks/7746-aca49b4385a2b028.js",
          revision: "aca49b4385a2b028",
        },
        {
          url: "/_next/static/chunks/7763-1751ddacdd2ba6f9.js",
          revision: "1751ddacdd2ba6f9",
        },
        {
          url: "/_next/static/chunks/8426-6cde42c7fab79641.js",
          revision: "6cde42c7fab79641",
        },
        {
          url: "/_next/static/chunks/9205-4c0b53987e4e09bf.js",
          revision: "4c0b53987e4e09bf",
        },
        {
          url: "/_next/static/chunks/9341.8181fde8cccea77c.js",
          revision: "8181fde8cccea77c",
        },
        {
          url: "/_next/static/chunks/9557-ab6ebc59014f4d74.js",
          revision: "ab6ebc59014f4d74",
        },
        {
          url: "/_next/static/chunks/9558-c8b68150cafe8b49.js",
          revision: "c8b68150cafe8b49",
        },
        {
          url: "/_next/static/chunks/9565-4e7a71abdb00bbe0.js",
          revision: "4e7a71abdb00bbe0",
        },
        {
          url: "/_next/static/chunks/9657-ce9568cff2ed3b7e.js",
          revision: "ce9568cff2ed3b7e",
        },
        {
          url: "/_next/static/chunks/9668-2db32970157f1907.js",
          revision: "2db32970157f1907",
        },
        {
          url: "/_next/static/chunks/app/_not-found/page-835d5d8cc61460d2.js",
          revision: "835d5d8cc61460d2",
        },
        {
          url: "/_next/static/chunks/app/about/loading-9772d94a6db640f6.js",
          revision: "9772d94a6db640f6",
        },
        {
          url: "/_next/static/chunks/app/about/page-ba43414e720b9195.js",
          revision: "ba43414e720b9195",
        },
        {
          url: "/_next/static/chunks/app/admin/announcements/page-9c77a722eba85880.js",
          revision: "9c77a722eba85880",
        },
        {
          url: "/_next/static/chunks/app/admin/business-services/startup/page-c7536f20c225a529.js",
          revision: "c7536f20c225a529",
        },
        {
          url: "/_next/static/chunks/app/admin/chat/page-eaf0999775a3f19b.js",
          revision: "eaf0999775a3f19b",
        },
        {
          url: "/_next/static/chunks/app/admin/consultations/page-66d1a5e89604fa16.js",
          revision: "66d1a5e89604fa16",
        },
        {
          url: "/_next/static/chunks/app/admin/events/%5Bid%5D/page-c09cf310425198ff.js",
          revision: "c09cf310425198ff",
        },
        {
          url: "/_next/static/chunks/app/admin/events/page-5fea6e7e82705e5b.js",
          revision: "5fea6e7e82705e5b",
        },
        {
          url: "/_next/static/chunks/app/admin/page-610baa52e0b3a3b9.js",
          revision: "610baa52e0b3a3b9",
        },
        {
          url: "/_next/static/chunks/app/admin/testimonials/page-52b74a11d5dfba18.js",
          revision: "52b74a11d5dfba18",
        },
        {
          url: "/_next/static/chunks/app/announcements/%5Bid%5D/page-74f08b8b9c5f8f46.js",
          revision: "74f08b8b9c5f8f46",
        },
        {
          url: "/_next/static/chunks/app/announcements/loading-7b655959200a4bf2.js",
          revision: "7b655959200a4bf2",
        },
        {
          url: "/_next/static/chunks/app/announcements/page-ae3a6673ba4fea2d.js",
          revision: "ae3a6673ba4fea2d",
        },
        {
          url: "/_next/static/chunks/app/api/admin/chatbot/route-960bc7d4cc2227f9.js",
          revision: "960bc7d4cc2227f9",
        },
        {
          url: "/_next/static/chunks/app/api/announcements/%5Bid%5D/route-960bc7d4cc2227f9.js",
          revision: "960bc7d4cc2227f9",
        },
        {
          url: "/_next/static/chunks/app/api/announcements/route-960bc7d4cc2227f9.js",
          revision: "960bc7d4cc2227f9",
        },
        {
          url: "/_next/static/chunks/app/api/consultations/%5Bid%5D/route-960bc7d4cc2227f9.js",
          revision: "960bc7d4cc2227f9",
        },
        {
          url: "/_next/static/chunks/app/api/consultations/list/route-960bc7d4cc2227f9.js",
          revision: "960bc7d4cc2227f9",
        },
        {
          url: "/_next/static/chunks/app/api/consultations/reply/route-960bc7d4cc2227f9.js",
          revision: "960bc7d4cc2227f9",
        },
        {
          url: "/_next/static/chunks/app/api/consultations/route-960bc7d4cc2227f9.js",
          revision: "960bc7d4cc2227f9",
        },
        {
          url: "/_next/static/chunks/app/api/consultations/stats/route-960bc7d4cc2227f9.js",
          revision: "960bc7d4cc2227f9",
        },
        {
          url: "/_next/static/chunks/app/api/consultations/time-slots/route-960bc7d4cc2227f9.js",
          revision: "960bc7d4cc2227f9",
        },
        {
          url: "/_next/static/chunks/app/api/events/%5Bid%5D/route-960bc7d4cc2227f9.js",
          revision: "960bc7d4cc2227f9",
        },
        {
          url: "/_next/static/chunks/app/api/events/route-960bc7d4cc2227f9.js",
          revision: "960bc7d4cc2227f9",
        },
        {
          url: "/_next/static/chunks/app/api/newsletter/subscribe/route-960bc7d4cc2227f9.js",
          revision: "960bc7d4cc2227f9",
        },
        {
          url: "/_next/static/chunks/app/api/testimonials/%5Bid%5D/route-960bc7d4cc2227f9.js",
          revision: "960bc7d4cc2227f9",
        },
        {
          url: "/_next/static/chunks/app/api/testimonials/route-960bc7d4cc2227f9.js",
          revision: "960bc7d4cc2227f9",
        },
        {
          url: "/_next/static/chunks/app/blog/loading-a8a870c7eaa59ad4.js",
          revision: "a8a870c7eaa59ad4",
        },
        {
          url: "/_next/static/chunks/app/blog/page-fa6a870f86c9fe8f.js",
          revision: "fa6a870f86c9fe8f",
        },
        {
          url: "/_next/static/chunks/app/business-solution/hr-consulting/loading-3974b46edebf9dac.js",
          revision: "3974b46edebf9dac",
        },
        {
          url: "/_next/static/chunks/app/business-solution/hr-consulting/page-658739f92b783c0c.js",
          revision: "658739f92b783c0c",
        },
        {
          url: "/_next/static/chunks/app/business-solution/hr-outsourcing/loading-6ae2b098dd9da516.js",
          revision: "6ae2b098dd9da516",
        },
        {
          url: "/_next/static/chunks/app/business-solution/hr-outsourcing/page-181d82b835f0232a.js",
          revision: "181d82b835f0232a",
        },
        {
          url: "/_next/static/chunks/app/business-solution/loading-cdbc1b2117e1ebe8.js",
          revision: "cdbc1b2117e1ebe8",
        },
        {
          url: "/_next/static/chunks/app/consultation/page-0a2c6df676dda691.js",
          revision: "0a2c6df676dda691",
        },
        {
          url: "/_next/static/chunks/app/contact/loading-87140de100aff601.js",
          revision: "87140de100aff601",
        },
        {
          url: "/_next/static/chunks/app/contact/page-c9b95887ccf8949e.js",
          revision: "c9b95887ccf8949e",
        },
        {
          url: "/_next/static/chunks/app/events/%5Bid%5D/page-58ecbb8fc67e4cee.js",
          revision: "58ecbb8fc67e4cee",
        },
        {
          url: "/_next/static/chunks/app/events/loading-d84056a4fc4bc14f.js",
          revision: "d84056a4fc4bc14f",
        },
        {
          url: "/_next/static/chunks/app/events/page-87722fe1043fcce7.js",
          revision: "87722fe1043fcce7",
        },
        {
          url: "/_next/static/chunks/app/layout-b36e2eaaa74ae021.js",
          revision: "b36e2eaaa74ae021",
        },
        {
          url: "/_next/static/chunks/app/loading-ac3b3ee47b5d77c6.js",
          revision: "ac3b3ee47b5d77c6",
        },
        {
          url: "/_next/static/chunks/app/page-0538a73442066f29.js",
          revision: "0538a73442066f29",
        },
        {
          url: "/_next/static/chunks/app/privacy-policy/page-9fc7f75e9864a2f0.js",
          revision: "9fc7f75e9864a2f0",
        },
        {
          url: "/_next/static/chunks/app/services/business/amendment/loading-17c158d485b50f78.js",
          revision: "17c158d485b50f78",
        },
        {
          url: "/_next/static/chunks/app/services/business/amendment/page-c2ec669ee5303cb3.js",
          revision: "c2ec669ee5303cb3",
        },
        {
          url: "/_next/static/chunks/app/services/business/closure/loading-6d16ba20501acfb0.js",
          revision: "6d16ba20501acfb0",
        },
        {
          url: "/_next/static/chunks/app/services/business/closure/page-8ec2187dcad2eeb5.js",
          revision: "8ec2187dcad2eeb5",
        },
        {
          url: "/_next/static/chunks/app/services/business/license/loading-f1d56efc298cbedf.js",
          revision: "f1d56efc298cbedf",
        },
        {
          url: "/_next/static/chunks/app/services/business/license/page-330315b49f6173dc.js",
          revision: "330315b49f6173dc",
        },
        {
          url: "/_next/static/chunks/app/services/business/renewal/loading-f142df61e45c16d8.js",
          revision: "f142df61e45c16d8",
        },
        {
          url: "/_next/static/chunks/app/services/business/renewal/page-904b7d9be5350b3c.js",
          revision: "904b7d9be5350b3c",
        },
        {
          url: "/_next/static/chunks/app/services/business/startup/loading-1bb665c771141db6.js",
          revision: "1bb665c771141db6",
        },
        {
          url: "/_next/static/chunks/app/services/business/startup/page-87fcba71985f2690.js",
          revision: "87fcba71985f2690",
        },
        {
          url: "/_next/static/chunks/app/services/loading-38390e2c414764ac.js",
          revision: "38390e2c414764ac",
        },
        {
          url: "/_next/static/chunks/app/services/page-9fc7f75e9864a2f0.js",
          revision: "9fc7f75e9864a2f0",
        },
        {
          url: "/_next/static/chunks/app/services/tax/mandatory/loading-fde4e4ef87a63e2c.js",
          revision: "fde4e4ef87a63e2c",
        },
        {
          url: "/_next/static/chunks/app/services/tax/mandatory/page-c27b0c3311701ac1.js",
          revision: "c27b0c3311701ac1",
        },
        {
          url: "/_next/static/chunks/app/services/tax/requirements/loading-ae430c3823f721f0.js",
          revision: "ae430c3823f721f0",
        },
        {
          url: "/_next/static/chunks/app/services/tax/requirements/page-aed6aafbbfd1a112.js",
          revision: "aed6aafbbfd1a112",
        },
        {
          url: "/_next/static/chunks/app/services/visa/international/%5BcountrySlug%5D/page-3aa44055e139d54c.js",
          revision: "3aa44055e139d54c",
        },
        {
          url: "/_next/static/chunks/app/services/visa/international/loading-df2d25f4ba0bd437.js",
          revision: "df2d25f4ba0bd437",
        },
        {
          url: "/_next/static/chunks/app/services/visa/international/page-18ef67d0e89c9f7c.js",
          revision: "18ef67d0e89c9f7c",
        },
        {
          url: "/_next/static/chunks/app/services/visa/long-term/loading-bcd835e9bf4d693f.js",
          revision: "bcd835e9bf4d693f",
        },
        {
          url: "/_next/static/chunks/app/services/visa/long-term/page-b837c085a3d117f6.js",
          revision: "b837c085a3d117f6",
        },
        {
          url: "/_next/static/chunks/app/services/visa/short-term/loading-79ac6111fe785e70.js",
          revision: "79ac6111fe785e70",
        },
        {
          url: "/_next/static/chunks/app/services/visa/short-term/page-89f299045d5121e0.js",
          revision: "89f299045d5121e0",
        },
        {
          url: "/_next/static/chunks/app/terms-of-service/page-09c70b76abf4bcb2.js",
          revision: "09c70b76abf4bcb2",
        },
        {
          url: "/_next/static/chunks/framework-6a579fe8df05a747.js",
          revision: "6a579fe8df05a747",
        },
        {
          url: "/_next/static/chunks/main-a99960e2df848400.js",
          revision: "a99960e2df848400",
        },
        {
          url: "/_next/static/chunks/main-app-aa9950696c488fc9.js",
          revision: "aa9950696c488fc9",
        },
        {
          url: "/_next/static/chunks/pages/_app-711a943019cc4c3f.js",
          revision: "711a943019cc4c3f",
        },
        {
          url: "/_next/static/chunks/pages/_error-74a3ff45f87fd51c.js",
          revision: "74a3ff45f87fd51c",
        },
        {
          url: "/_next/static/chunks/polyfills-42372ed130431b0a.js",
          revision: "846118c33b2c0e922d7b3a7676f81f6f",
        },
        {
          url: "/_next/static/chunks/webpack-abd7f90166ff24e3.js",
          revision: "abd7f90166ff24e3",
        },
        {
          url: "/_next/static/css/db91956493c12b05.css",
          revision: "db91956493c12b05",
        },
        {
          url: "/_next/static/css/f30152c0704fba31.css",
          revision: "f30152c0704fba31",
        },
        {
          url: "/_next/static/media/569ce4b8f30dc480-s.p.woff2",
          revision: "ef6cefb32024deac234e82f932a95cbd",
        },
        {
          url: "/_next/static/media/747892c23ea88013-s.woff2",
          revision: "a0761690ccf4441ace5cec893b82d4ab",
        },
        {
          url: "/_next/static/media/8d697b304b401681-s.woff2",
          revision: "cc728f6c0adb04da0dfcb0fc436a8ae5",
        },
        {
          url: "/_next/static/media/93f479601ee12b01-s.p.woff2",
          revision: "da83d5f06d825c5ae65b7cca706cb312",
        },
        {
          url: "/_next/static/media/9610d9e46709d722-s.woff2",
          revision: "7b7c0ef93df188a852344fc272fc096b",
        },
        {
          url: "/_next/static/media/ba015fad6dcf6784-s.woff2",
          revision: "8ea4f719af3312a055caf09f34c89a77",
        },
        { url: "/abic-logo.png", revision: "b169754b7b35ce4560832303fa677da6" },
        {
          url: "/canada-visa.png",
          revision: "7a7e5da2b7f0f95d7903af306d6b798d",
        },
        { url: "/canada.png", revision: "3f751874a3b30ef515856760db1709f7" },
        {
          url: "/canadian-rockies.png",
          revision: "109dd8158824256a7b1605d8911afa03",
        },
        { url: "/china.png", revision: "823e825d7c0ff0620774eb643af53dd7" },
        {
          url: "/colosseum-italy.png",
          revision: "9bd7c5c722ef0577be8d869a5e56d696",
        },
        {
          url: "/destinatioon_thailand.png",
          revision: "3ca5f66ba7a33e0ce7a6198e566d4723",
        },
        {
          url: "/eiffel-tower-sunset.png",
          revision: "b9c8112e3610927bf03fb7cfc8236ba7",
        },
        {
          url: "/european-landmarks.png",
          revision: "ab598d852d2465f5cc810001d55f9a5e",
        },
        {
          url: "/events/ai-data-science-bootcamp.png",
          revision: "5f253db740a2b6bdd896d288c5a7ee71",
        },
        {
          url: "/events/digital-marketing-summit.png",
          revision: "28cfbeb5b31e5ffa49abad8c75abbb11",
        },
        {
          url: "/events/e-commerce-expo.png",
          revision: "64722e5df950671e2809c30cfb77af5e",
        },
        {
          url: "/events/fintech-forum.png",
          revision: "9e242bd21cf7cd5f1c9af5631018c49c",
        },
        {
          url: "/events/healthcare-innovation.png",
          revision: "e51fc0675f613f41b5abb11b5879c4e8",
        },
        {
          url: "/events/startup-pitch.png",
          revision: "6a2cd173b6ad166567a4d16fe943d2a2",
        },
        {
          url: "/events/sustainable-business.png",
          revision: "e7571489ff3cc7acba21c3f58d3e0b2f",
        },
        {
          url: "/events/tech-conference.png",
          revision: "bad262169182feb5601405d0b33a0d6d",
        },
        { url: "/file.svg", revision: "d09f95206c3fa0bb9bd9fefabfd0ea71" },
        { url: "/globe.svg", revision: "2aaafa6a49b6563925fe440891e32717" },
        {
          url: "/great-wall-china.png",
          revision: "1095245509318d5f09ccf9425fce8e65",
        },
        {
          url: "/great-wall-sunset.png",
          revision: "c2a4865bf224a0d449a571cfe72c305f",
        },
        {
          url: "/hero-international-visa.png",
          revision: "4380ce19f117c88a36057643a59ac467",
        },
        {
          url: "/hong-kong-skyline.png",
          revision: "a9986770d400710369fe9744d11c4671",
        },
        {
          url: "/hong-kong-visa.png",
          revision: "87deda125aaa0ec4893e1c90b2e29a64",
        },
        { url: "/hongkong.png", revision: "b74edd2bb3c7191a4db547c3a3cd087c" },
        {
          url: "/icon512_maskable.png",
          revision: "efb013d4ae0f8c123a984f83d71eae1e",
        },
        {
          url: "/icon512_rounded.png",
          revision: "9854f3c59d3908a6d6777541e9491864",
        },
        {
          url: "/images/abic-logo.png",
          revision: "b169754b7b35ce4560832303fa677da6",
        },
        {
          url: "/images/callcenter-girl.png",
          revision: "49d7985aac44f20449bf5fde7caa0d8d",
        },
        {
          url: "/images/canada-visa.png",
          revision: "7a7e5da2b7f0f95d7903af306d6b798d",
        },
        {
          url: "/images/canada.png",
          revision: "3f751874a3b30ef515856760db1709f7",
        },
        {
          url: "/images/canadian-rockies.png",
          revision: "109dd8158824256a7b1605d8911afa03",
        },
        {
          url: "/images/china.png",
          revision: "823e825d7c0ff0620774eb643af53dd7",
        },
        {
          url: "/images/colosseum-italy.png",
          revision: "9bd7c5c722ef0577be8d869a5e56d696",
        },
        {
          url: "/images/destination_thailand.png",
          revision: "3ca5f66ba7a33e0ce7a6198e566d4723",
        },
        {
          url: "/images/eiffel-tower-sunset.png",
          revision: "b9c8112e3610927bf03fb7cfc8236ba7",
        },
        {
          url: "/images/european-landmarks.png",
          revision: "ab598d852d2465f5cc810001d55f9a5e",
        },
        {
          url: "/images/great-wall-china.png",
          revision: "1095245509318d5f09ccf9425fce8e65",
        },
        {
          url: "/images/great-wall-sunset.png",
          revision: "c2a4865bf224a0d449a571cfe72c305f",
        },
        {
          url: "/images/hero-international-visa.png",
          revision: "4380ce19f117c88a36057643a59ac467",
        },
        {
          url: "/images/hong-kong-skyline.png",
          revision: "a9986770d400710369fe9744d11c4671",
        },
        {
          url: "/images/hong-kong-visa.png",
          revision: "87deda125aaa0ec4893e1c90b2e29a64",
        },
        {
          url: "/images/hongkong.png",
          revision: "b74edd2bb3c7191a4db547c3a3cd087c",
        },
        {
          url: "/images/italy-visa.png",
          revision: "1f33d351a3c3bf2eafd1e5398f2fccdf",
        },
        {
          url: "/images/italy.png",
          revision: "6d74ec24f4d43e578778494ef270f734",
        },
        {
          url: "/images/japan-visa.png",
          revision: "ee2947fcd321044fa054e2cb788790dc",
        },
        {
          url: "/images/japan.png",
          revision: "aa0b08b8f8c9ab648cefecaa766f7240",
        },
        {
          url: "/images/korea-visa.png",
          revision: "4936ca2539d1d0cdab2d9eb9bd90c67f",
        },
        {
          url: "/images/korea.png",
          revision: "f00ef398ed9409472d8b16c023ad816d",
        },
        {
          url: "/images/map.png",
          revision: "0620695738694016028b7391eae30a66",
        },
        {
          url: "/images/mount-fuji-japan.png",
          revision: "f6337d2335c44167a80eec032063f470",
        },
        {
          url: "/images/nav-background.png",
          revision: "097a2e43d71a605e68b069c9d1311487",
        },
        {
          url: "/images/philippine-flag.png",
          revision: "197958e51593222c02ff35d0f6518d0d",
        },
        {
          url: "/images/placeholder (1).png",
          revision: "773b48b8deb50e71d4f3d799bee79896",
        },
        {
          url: "/images/placeholder (2).png",
          revision: "773b48b8deb50e71d4f3d799bee79896",
        },
        {
          url: "/images/placeholder.png",
          revision: "773b48b8deb50e71d4f3d799bee79896",
        },
        {
          url: "/images/saudi-arabia-desert.png",
          revision: "43dc72ff43945232237e1837cc57ccdf",
        },
        {
          url: "/images/saudi-visa.png",
          revision: "c6553cbe9994ffb9e96bd3d3c3871622",
        },
        {
          url: "/images/saudi.png",
          revision: "3b27726ba6ed1a5781f19c581dfeb161",
        },
        {
          url: "/images/schengen.png",
          revision: "8755f84b8b42b4ee918ef77eb9f015de",
        },
        {
          url: "/images/statue-of-liberty.png",
          revision: "89cbae484b3241fb5b8966b8c0244b00",
        },
        {
          url: "/images/subtle-pattern.png",
          revision: "0b108548e646a30da54bf0d10fa07ee9",
        },
        {
          url: "/images/tax.png",
          revision: "fc2aba5a516b6c8a6570871f3bd7efb1",
        },
        {
          url: "/images/thailand-beach.png",
          revision: "b990a5778a11aca62ba42840300fe97d",
        },
        {
          url: "/images/thailand-temple.png",
          revision: "12a378810135c4013195c57cc3c3844b",
        },
        {
          url: "/images/thailand.png",
          revision: "9ec82a2a4a1db3930426372566d78c96",
        },
        {
          url: "/images/tourist-thailand-visa.png",
          revision: "98dea276a24a133e76ae5235cae342d7",
        },
        {
          url: "/images/two_smiling.png",
          revision: "a025ebb6cfff067e323a03ac9a200e10",
        },
        {
          url: "/images/usa-visa.png",
          revision: "2dd3fda93dd2cf5f376858499cbb903d",
        },
        {
          url: "/images/usa.png",
          revision: "bb5b12e08e57860cb154addb565da4f3",
        },
        {
          url: "/italy-visa.png",
          revision: "1f33d351a3c3bf2eafd1e5398f2fccdf",
        },
        { url: "/italy.png", revision: "6d74ec24f4d43e578778494ef270f734" },
        {
          url: "/japan-visa.png",
          revision: "ee2947fcd321044fa054e2cb788790dc",
        },
        { url: "/japan.png", revision: "aa0b08b8f8c9ab648cefecaa766f7240" },
        {
          url: "/korea-visa.png",
          revision: "4936ca2539d1d0cdab2d9eb9bd90c67f",
        },
        { url: "/korea.png", revision: "f00ef398ed9409472d8b16c023ad816d" },
        { url: "/manifest.json", revision: "200e42b8cd2b0ee198935c4415dd8590" },
        {
          url: "/manifest_and_icons.zip",
          revision: "0995f628dc1c4495349b5dbaa5ae5b6a",
        },
        { url: "/map.png", revision: "0620695738694016028b7391eae30a66" },
        {
          url: "/mount-fuji-japan.png",
          revision: "f6337d2335c44167a80eec032063f470",
        },
        { url: "/next.svg", revision: "8e061864f388b47f33a1c3780831193e" },
        {
          url: "/philippine-flag.png",
          revision: "197958e51593222c02ff35d0f6518d0d",
        },
        {
          url: "/placeholder (1).png",
          revision: "773b48b8deb50e71d4f3d799bee79896",
        },
        {
          url: "/placeholder (2).png",
          revision: "773b48b8deb50e71d4f3d799bee79896",
        },
        {
          url: "/placeholder.png",
          revision: "773b48b8deb50e71d4f3d799bee79896",
        },
        {
          url: "/saudi-arabia-desert.png",
          revision: "43dc72ff43945232237e1837cc57ccdf",
        },
        {
          url: "/saudi-visa.png",
          revision: "c6553cbe9994ffb9e96bd3d3c3871622",
        },
        { url: "/saudi.png", revision: "3b27726ba6ed1a5781f19c581dfeb161" },
        { url: "/schengen.png", revision: "8755f84b8b42b4ee918ef77eb9f015de" },
        {
          url: "/statue-of-liberty.png",
          revision: "89cbae484b3241fb5b8966b8c0244b00",
        },
        {
          url: "/subtle-pattern.png",
          revision: "0b108548e646a30da54bf0d10fa07ee9",
        },
        {
          url: "/thailand-beach.png",
          revision: "b990a5778a11aca62ba42840300fe97d",
        },
        {
          url: "/thailand-temple.png",
          revision: "12a378810135c4013195c57cc3c3844b",
        },
        { url: "/thailand.png", revision: "9ec82a2a4a1db3930426372566d78c96" },
        {
          url: "/tourist-thailand-visa.png",
          revision: "98dea276a24a133e76ae5235cae342d7",
        },
        { url: "/usa-visa.png", revision: "2dd3fda93dd2cf5f376858499cbb903d" },
        { url: "/usa.png", revision: "bb5b12e08e57860cb154addb565da4f3" },
        { url: "/vercel.svg", revision: "c0af2f507b369b085b35ef4bbe3bcf1e" },
        { url: "/window.svg", revision: "a2760511c65806022ad20adf74370ff3" },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      "/",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: a,
              event: s,
              state: i,
            }) =>
              a && "opaqueredirect" === a.type
                ? new Response(a.body, {
                    status: 200,
                    statusText: "OK",
                    headers: a.headers,
                  })
                : a,
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-image",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: "static-audio-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: "static-video-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-data",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: "static-data-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const a = e.pathname;
        return !a.startsWith("/api/auth/") && !!a.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "others",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: "cross-origin",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      "GET"
    );
});
