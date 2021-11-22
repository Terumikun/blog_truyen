class Function {
  static getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] == variable) {
        return pair[1];
      }
    }
    return false;
  }
  static paginnation(data) {
    var current = parseInt(data.page),
      page = parseInt(Function.getQueryVariable("page")),
      last = data.numPages,
      delta = 2,
      left = current - delta,
      right = current + delta + 1,
      range = [],
      rangeWithDots = [],
      l;

    for (let i = 1; i <= last; i++) {
      if (i == 1 || i == last || (i >= left && i < right)) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          if (current == l) {
            rangeWithDots.push(
              '<li class="paginationjs-page J-paginationjs-page active"><a href="?page=' +
                (l + 1) +
                '" data-page="',
              l + 1,
              '">',
              l + 1,
              "</a></span>"
            );
          } else {
            rangeWithDots.push(
              '<li class="paginationjs-page J-paginationjs-page"><a href="?page=' +
                (l + 1) +
                '" data-page="',
              l + 1,
              '">',
              l + 1,
              "</a></li>"
            );
          }
        } else if (i - l !== 1) {
          rangeWithDots.push(
            '<li class="paginationjs-ellipsis disabled"><a>',
            "...",
            "</a></li>"
          );
        }
      }

      if (current == i) {
        rangeWithDots.push(
          '<li class="paginationjs-page J-paginationjs-page active"><a title="',
          i,
          '" href="?page=' + i + '" data-page="',
          i,
          '">',
          i,
          "</a></li>"
        );
      } else {
        if (i == 1)
          rangeWithDots.push(
            '<li class="paginationjs-prev J-paginationjs-previous"><a title="?page=' +
              (current == 1 ? 1 : current - 1) +
              '" href="?page=' +
              (current == 1 ? 1 : current - 1) +
              '" data-page="' +
              i +
              '" class="text">',
            "«",
            "</a></li>"
          );

        rangeWithDots.push(
          '<li class="paginationjs-page J-paginationjs-page"><a title="',
          i,
          '" href="?page=' + i + '" data-page="',
          i,
          '">',
          i,
          "</a></li>"
        );
      }
      if (current == last) {
      } else {
        if (i == last)
          rangeWithDots.push(
            '<li class="paginationjs-next J-paginationjs-next"><a title="?page=' +
              (current == last ? last : current + 1) +
              '" href="?page=' +
              (current == last ? last : current + 1) +
              '" data-page="' +
              i +
              '" class="text">',
            "»",
            "</a></li>"
          );
      }
      l = i;
    }
    $(data.idbtPagination).html(rangeWithDots.join(""));
  }
}

class Main {
  constructor() {
    new TrangChu();
    new TrangThongTin();
    new DocTruyen();
    new TheLoaiTruyen();
  }
}

class ThongTinBlog {
  constructor() {
    this.setting();
    this.website();
  }

  setting() {
    return {
      newUpdate: "www_trxs_cc",
      idXuattruyen: "#grid-project",
      idXuatThongTinTruyen: "#post-wrapper",
      idXuatNoidungTT: ".detail-content p",
      idXuatTitleTT: "article#item-detail .post-title",
      idXuatListChapterTT: "#nt_listchapter nav ul",
      idXuatImageTT: "#item-detail .separator a img",
      idXuatkhuonTruyenReader: "#content-wrapper",
      idXuatContentnoidungTruyenReader: "#post-body",
      idXuatTitleTruyenReader: ".main-head.main-head-default",
      theloaiTruyen: "#list-genre",
      idXuatPrevChapReader: "#chap-prev-link",
      idXuatNextChapReader: "#chap-next-link",
      idXuatHomeLinkReader: "#chap-home-link",
      urlDich: "https://dichngay.com/translate?bid=&tl=&u=",
      idMucluc: "#sort-filter ul.dropdown-menu",
      findWebsite: "https://blogtruyen2021.blogspot.com",
    };
  }
  website() {
    return {
      www_trxs_cc: {
        url: "http://www.trxs.cc",
        patname: "/book/trx/xxx.html",
        urlGettruyen: "https://www.trxs.cc/tongren/",
        idgetTruyen: {
          url: ".books.m-cols .bk a",
          title: ".infos h3",
          image: ".pic img",
        },
        getPage: {
          id: ".content .page a",
          link: "https://www.trxs.cc/tongren/index_2.html",
          linkMau: "http://www.trxs.cc/tongren/index_[page].html",
          suaLink: {
            sua: /https:\/\/www\.trxs\.cc\/tongren\/index_(.*?)\.html/gi,
            doi: 1,
          },
          name: "Đuôi trang",
          total: 1,
        },
        booktruyen: {
          listchapter: ".book_list ul li a",
          image: ".book_info .pic img",
          title: ".book_info .infos h1",
          noidung: ".book_info .infos p",
        },
        doctruyen: {
          noidung: ".read_chapterDetail",
          title: ".read_chapterName h1",
          homelink: {
            id: ".pageNav a",
            name: "Mục lục",
          },
          nextchap: {
            id: ".pageNav a",
            name: "Chương sau",
          },
          prevchap: {
            id: ".pageNav a",
            name: "Chương trước",
          },
        },
        type: "listchapter",
        translate: true,
      },
    };
  }

  theloaitruyen() {
    return {
      "Đồng Nhân": {
        linkGet: "https://www.trxs.cc/tongren/",
        linkPage: "http://www.trxs.cc/tongren/index_[page].html",
        hostName: "www_trxs_cc",
        name: "dong-nhan",
      },
    };
  }

  setdataLocastorage() {
    var hostName = atob(location.pathname.split("/")[2]);
    var urlGet = atob(location.pathname.split("/")[3]);
    var website = this.website()[hostName];
    var setting = this.setting();

    var storage = localStorage.dataTruyen
      ? JSON.parse(localStorage.dataTruyen)
      : localStorage.setItem("dataTruyen", "{}");

    if (location.href.indexOf("doc-truyen") > -1) {
      var getHostName = $(setting.idXuatHomeLinkReader)
        .attr("href")
        .split("/")[3];
      storage[getHostName].chapter = $(setting.idXuatTitleTruyenReader)
        .text()
        .trim();
      storage[getHostName].linkchapter = location.pathname;
      localStorage.dataTruyen = JSON.stringify(storage);
      return;
    }

    if (!storage[btoa(urlGet)]) {
      storage[btoa(urlGet)] = {};
    }

    storage[btoa(urlGet)].title = $(setting.idXuatTitleTT).text();
    storage[btoa(urlGet)].link = location.href;

    localStorage.dataTruyen = JSON.stringify(storage);
  }
}

class TrangChu extends ThongTinBlog {
  constructor() {
    super();

    if (
      location.href.indexOf("thong-tin") > -1 ||
      location.href.indexOf("the-loai") > -1 ||
      location.href.indexOf("doc-truyen") > -1
    ) {
      return;
    }

    if (localStorage.getItem("clickDropdow") == "true") {
      this.getTrangchu();
      return;
    }

    this.taoMucluc();
    this.getTrangchu();
    this.getMucluc();
  }

  taoMucluc() {
    var website = this.website();
    var keyWeb = Object.keys(website);
    var setting = this.setting();
    var innerHTML = "";
    for (var index of keyWeb) {
      innerHTML += `<li><a>${index}</a></li>`;
    }

    $(setting.idMucluc).append(innerHTML);
  }

  getTrangchu() {
    var website = this.website();
    var keyWeb = Object.keys(website);
    var setting = this.setting();
    var findDropdow = $("#sort-filter a.dropdown-toggle").text().trim();

    localStorage.removeItem("clickDropdow");

    switch (findDropdow) {
      case "Cập nhật mới nhất":
        website = website[setting.newUpdate];
        website.host = setting.newUpdate;
        break;
      default:
        website = website[findDropdow];
        website.host = findDropdow;
        break;
    }

    var urlGet = website.translate
      ? setting.urlDich + website.urlGettruyen
      : website.urlGettruyen;

    if (Function.getQueryVariable("page")) {
      urlGet = website.translate
        ? setting.urlDich +
          website.getPage.linkMau.replace(
            "[page]",
            Function.getQueryVariable("page")
          )
        : website.getPage.linkMau.replace(
            "[page]",
            Function.getQueryVariable("page")
          );
    }

    $.ajax({
      url: urlGet,
      type: "GET",
      success: (xhr) => {
        var contentTruyen = "";
        var getContent = $(xhr).find("#contentframe").attr("srcdoc");
        var creatElement = document.createElement("html");
        creatElement.innerHTML = getContent;
        var DataTruyen = creatElement.querySelectorAll(website.idgetTruyen.url);

        for (var index of DataTruyen) {
          var linkImage =
            index
              .querySelector(website.idgetTruyen.image)
              .src.indexOf(setting.findWebsite) == 0
              ? index
                  .querySelector(website.idgetTruyen.image)
                  .src.replace(setting.findWebsite, website.url)
              : index.querySelector(website.idgetTruyen.image).src;

          var title = index.querySelector(website.idgetTruyen.title).innerText;

          var linkdoc = btoa(index.href);

          contentTruyen += `<div class="col-lg-4 col-md-6 col-sm-4 col-ms-6">
                <a
                    class="project project-warning"
                    href="/thong-tin/${btoa(website.host)}/${linkdoc}"
                    id="9162527970550105079"
                    data-container="body"
                    data-toggle="popover"
                    data-trigger="hover"
                    data-placement="auto left"
                    data-html="true"
                >
                    <div class="img-project-container">
                        <div class="img-project" style="background-image: url('${linkImage}');"></div>
                    </div>
                    <div class="project-content">
                        <div class="title-project-container"><div class="title-project">${title}</div></div>
                    </div>
                </a>
            </div>
            `;
        }

        $(setting.idXuattruyen).html(contentTruyen);

        this.paginnation(website, setting);

        //

        //   console.log(contentTruyen);

        // console.log(urlTruyen);
      },
      error: () => {
        alert("Xin vui lòng cài đặt extension.");
      },
    });
  }

  getMucluc() {
    $("#sort-filter>.dropdown-menu>li>a").click(function () {
      var sort_text = $(this).text();
      var sort_value = $(this).data("value");

      $("#sort-filter>.dropdown-menu>li").removeClass("active");
      $(this).parent().addClass("active");
      $("#sort-filter>.dropdown-toggle")
        .data("value", sort_value)
        .html(sort_text + ' <span class="caret"></span>');

      $("#sort-filter").trigger("click");
      localStorage.setItem("clickDropdow", true);
      new TrangChu();
      return false;
    });
  }

  paginnation(website, setting) {
    $.ajax({
      url: website.translate
        ? setting.urlDich + website.getPage.link
        : website.getPage.link,
      type: "GET",
      success: (xhr) => {
        var contentTruyen = "";
        var getContent = $(xhr).find("#contentframe").attr("srcdoc");
        var creatElement = document.createElement("html");
        creatElement.innerHTML = getContent;
        var dataPage = "";
        creatElement.querySelectorAll(website.getPage.id).forEach((data) => {
          if (data.innerText == website.getPage.name) {
            dataPage = data.href;
          }
        });
        var decodeURIPage = +decodeURIComponent(dataPage).split(
          website.getPage.suaLink.sua
        )[website.getPage.suaLink.doi];
        var totalPage = decodeURIPage;

        Function.paginnation({
          page: Function.getQueryVariable("page")
            ? Function.getQueryVariable("page")
            : 1,
          numPages: totalPage,
          idbtPagination: "#pagination-project ul.pagination",
        });

        //   console.log(contentTruyen);

        // console.log(urlTruyen);
      },
      error: () => {
        alert("Xin vui lòng cài đặt extension.");
      },
    });
  }
}

class TrangThongTin extends ThongTinBlog {
  constructor() {
    super();
    if (this.checkReader()) {
      this.HTMLTrangthongtin();
      this.getThongtin();
    }
  }

  checkReader() {
    var url = location.href.indexOf("thong-tin") > 0;
    return url;
  }

  HTMLTrangthongtin() {
    $(this.setting().idXuatThongTinTruyen).html(`<article id="item-detail">
    <h1 class="post-title entry-title main-head main-head-center main-head-default"></h1>
    
    
    <div class="separator" style="clear: both; text-align: center;">
<a imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" data-original-height="1600" data-original-width="1152" height="400" src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIPDw8PDxIVDw8PDw8PDw8PFRcPDw8PFRUWFhUVFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAPQAzwMBIgACEQEDEQH/xAAXAAEBAQEAAAAAAAAAAAAAAAAAAQcC/8QAFxABAQEBAAAAAAAAAAAAAAAAABEBEv/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDSgAAAAAAAAAAAAAKGgAAAAAAAAAAAoCAtBAAAAAAAMAFAQAAAAAAAAAAMUEAAAAAAAAAgAAAEAAAAAAAAAABFMAILUAAoAUoAAAUACgALQQAACgBQACgBQAFBAAAAAACgAAAAAAAUAAAAAKAAAAUAAKCKFAAAAwAAAAAACItAAAQUAAAAAMAAABFAAAIAAAAYAG4AACg5UAAAAACABgqAYqAEIAAFAhAAIigAAAAqABAACAAABAAIAACghAAAAAAoAAAAAAAAAAABQAAAAAAAAAgAECgAAEAAAAAAIABAAAAIAAAGhAARQAAAAAAAAAAAQFAAAAAAKAAYAAAAAAAAAAAAAUACgAAAAAAAAAFAAAAAAAAAAAAAAAACgAAAAAAAAAAAAAUAAAAAAClAAAAAAKAAAAAUoAUAAoAAAAAAAAAUAAAAAAAAoAAAAAAAsIoCckUBIQAOTMUBIRQEhFAIkADcOVASG4oCQigJCKAkMwAIZigP/9k=" width="285"></a></div>
<div class="detail-content">
    <h3 class="list-title">
    <i class="fa fa-file-text-o">
    </i> Nội dung
    </h3>
    <p></p>
    </div>
    <div class="list-chapter" id="nt_listchapter">
    <h2 class="list-title clearfix">
    <i class="fa fa-list">
    </i> Danh sách chương
    </h2>
    <nav>
    <ul>
    </ul>
    </nav>
    </div>
    </article>`);
  }

  getThongtin() {
    var hostName = atob(location.pathname.split("/")[2]);
    var urlGet = atob(location.pathname.split("/")[3]);
    var website = this.website()[hostName];
    var setting = this.setting();

    console.log(website);
    $.ajax({
      url: urlGet,
      type: "GET",
      success: (xhr) => {
        var contentTruyen = "";
        var getContent = $(xhr).find("#contentframe").attr("srcdoc");
        var creatElement = document.createElement("html");
        creatElement.innerHTML = getContent;
        var innerContent = "";
        var listChapter = creatElement.querySelectorAll(
          website.booktruyen.listchapter
        );
        var noidung = creatElement.querySelector(
          website.booktruyen.noidung
        ).innerHTML;
        var title = creatElement.querySelector(
          website.booktruyen.title
        ).innerText;

        var image =
          creatElement
            .querySelector(website.idgetTruyen.image)
            .src.indexOf(setting.findWebsite) == 0
            ? creatElement
                .querySelector(website.idgetTruyen.image)
                .src.replace(setting.findWebsite, website.url)
            : creatElement.querySelector(website.idgetTruyen.image).src;

        for (var index of listChapter) {
          innerContent += `<li class="row">
<div class="col-xs-5 chapter">
<a href="/doc-truyen/${btoa(hostName)}/${btoa(
            index.href
          )}" data-id="792751">${index.innerText.trim()}</a>
</div>
</li>`;
        }

        $(setting.idXuatImageTT).attr("src", image);
        $(setting.idXuatListChapterTT).html(innerContent);
        $(setting.idXuatNoidungTT).html(noidung);
        $(setting.idXuatTitleTT).html(title);
        $("title").html(title);
        this.setdataLocastorage();

        //console.log(DataTruyen);

        //   console.log(contentTruyen);

        // console.log(urlTruyen);
      },
      error: () => {
        alert("Xin vui lòng cài đặt extension.");
      },
    });
  }
}

class DocTruyen extends ThongTinBlog {
  constructor() {
    super();
    if (this.checkReader()) {
      $("#sidebar-wrapper").remove();
      this.HTML();
      this.getThongtin();
    }
  }

  HTML() {
    $(this.setting().idXuatkhuonTruyenReader).html(`                     
          <h3 class="post-title entry-title main-head main-head-center main-head-default" itemprop="name"></h3>
          
          <div class="post-header">
          <div class="post-header-line-1">
          <span class="post-timestamp">
          </span>
          </div>
          </div>
          <div class="post-body entry-content" id="post-body" itemprop="description articleBody">
          
          </div>
          <div class="post-footer">
          <div class="post-footer-line post-footer-line-1">
          <span class="post-author vcard">
          </span>
          <span class="reaction-buttons">
          </span>
          <span class="post-comment-link">
          </span>
          <span class="post-backlinks post-comment-link">
          </span>
          <span class="post-icons">
          </span>
          <div class="post-share-buttons goog-inline-block">
          </div>
          </div>
          <div class="post-footer-line post-footer-line-2">
          <span class="post-labels">
          </span>
          </div>
          <div class="post-footer-line post-footer-line-3">
          <span class="post-location">
          </span>
          </div>
          </div>
              <div class="chap-nav">
          <div aria-label="Justified button group" class="btn-group btn-group-justified" role="group">
          <a class="btn btn-primary" data-container="body" data-placement="auto bottom" data-toggle="tooltip" id="chap-prev-link" role="button">
          <i aria-hidden="true" class="fa fa-chevron-left"></i>
          <span class="hidden-xs">&nbsp; Chương trước</span>
          </a>
          <a class="btn btn-primary" data-container="body" data-placement="auto bottom" data-toggle="tooltip" id="chap-home-link" role="button" href="/" title="" data-original-title="Shinigami wo Tabeta Shoujo">
          <i aria-hidden="true" class="fa fa-home fa-lg"></i>
          <span class="hidden-xs">&nbsp; Trang chính</span>
          </a>
          <a class="btn btn-primary" data-container="body" data-placement="auto bottom" data-toggle="tooltip" id="chap-next-link" role="button" href="/" title="" data-original-title="Chương 2: Pho mát thật ngon!">
          <span class="hidden-xs">Chương kế &nbsp;</span>
          <i aria-hidden="true" class="fa fa-chevron-right"></i>
          </a>
          </div>
          </div>

        `);
  }

  checkReader() {
    var url = location.href.indexOf("doc-truyen") > 0;
    return url;
  }

  getThongtin() {
    var hostName = atob(location.pathname.split("/")[2]);
    var urlGet = atob(location.pathname.split("/")[3]);
    var website = this.website()[hostName];
    var setting = this.setting();

    console.log(website);
    $.ajax({
      url: urlGet,
      type: "GET",
      success: (xhr) => {
        var storage = localStorage.dataTruyen
          ? JSON.parse(localStorage.dataTruyen)
          : localStorage.setItem("dataTruyen", "{}");

        var nextchap = "";
        var prevchap = "";
        var homelink = "";

        var getContent = $(xhr).find("#contentframe").attr("srcdoc");
        var creatElement = document.createElement("html");
        creatElement.innerHTML = getContent;
        var noidung = creatElement.querySelector(
          website.doctruyen.noidung
        ).innerHTML;
        var title = creatElement.querySelector(
          website.doctruyen.title
        ).innerText;

        creatElement
          .querySelectorAll(website.doctruyen.nextchap.id)
          .forEach((data) => {
            if (data.innerText == website.doctruyen.nextchap.name) {
              nextchap = `/doc-truyen/${btoa(hostName)}/${btoa(data.href)}`;
            }

            if (data.innerText == website.doctruyen.prevchap.name) {
              prevchap = `/doc-truyen/${btoa(hostName)}/${btoa(data.href)}`;
            }

            if (data.innerText == website.doctruyen.homelink.name) {
              homelink = `/thong-tin/${btoa(hostName)}/${btoa(data.href)}`;
            }
          });

        console.log(nextchap);

        $(setting.idXuatHomeLinkReader).attr("href", homelink);
        $(setting.idXuatContentnoidungTruyenReader).html(noidung);
        $(setting.idXuatTitleTruyenReader).html(title);
        $(setting.idXuatPrevChapReader).attr("href", prevchap);
        $(setting.idXuatNextChapReader).attr("href", nextchap);
        $("title").html(title);
        this.setdataLocastorage();

        //console.log(DataTruyen);

        //   console.log(contentTruyen);

        // console.log(urlTruyen);
      },
      error: () => {
        alert("Xin vui lòng cài đặt extension.");
      },
    });
  }
}

class TheLoaiTruyen extends ThongTinBlog {
  constructor() {
    super();
    this.XuattheloaiTruyen();
    if (location.href.indexOf("the-loai") > -1) {
      this.HTML();
      this.getTheloai();
    }
  }

  XuattheloaiTruyen() {
    var theloaitruyen = this.theloaitruyen();

    var objectKey = Object.keys(theloaitruyen);
    var xuatTheloai = "";

    for (var index of objectKey) {
      xuatTheloai += `<li class="dropdown-item-with-badge"><a href="/the-loai/${theloaitruyen[index].name}/"><div class="dropdown-item-text">${index}</div><span class="badge">0</span></a></li>`;
    }

    $(this.setting().theloaiTruyen).html(xuatTheloai);
  }

  HTML() {
    $(this.setting().idXuatThongTinTruyen)
      .html(`<h3>Thể loại <strong></strong></h3>

    <div class="row row-10" id="grid-project"></div>
    <nav aria-label="Page navigation" class="text-center" id="pagination-project"><ul class='pagination'></ul></nav>
    `);
  }

  getTheloai() {
    var getUrlTheloai = $(
      `[href="/the-loai/${location.pathname.split("/")[2]}/"]`
    )
      .find("div")
      .text()
      .trim();
    var arrTheloai = this.theloaitruyen()[getUrlTheloai];
    var linkGet = arrTheloai.linkGet;
    var website = this.website()[arrTheloai.hostName];
    var setting = this.setting();
    $("#post-wrapper strong").html(getUrlTheloai);
    $('title').html(getUrlTheloai);

    console.log(website);

    var urlGet = website.translate ? setting.urlDich + linkGet : linkGet;

    if (
      Function.getQueryVariable("page") &&
      +Function.getQueryVariable("page") > 1
    ) {
      urlGet = website.translate
        ? setting.urlDich +
          arrTheloai.linkPage.replace(
            "[page]",
            Function.getQueryVariable("page")
          )
        : arrTheloai.linkPage.replace(
            "[page]",
            Function.getQueryVariable("page")
          );
    }

    $.ajax({
      url: urlGet,
      type: "GET",
      success: (xhr) => {
        var contentTruyen = "";
        var getContent = $(xhr).find("#contentframe").attr("srcdoc");
        var creatElement = document.createElement("html");
        creatElement.innerHTML = getContent;
        var DataTruyen = creatElement.querySelectorAll(website.idgetTruyen.url);

        for (var index of DataTruyen) {
          var linkImage =
            index
              .querySelector(website.idgetTruyen.image)
              .src.indexOf(setting.findWebsite) == 0
              ? index
                  .querySelector(website.idgetTruyen.image)
                  .src.replace(setting.findWebsite, website.url)
              : index.querySelector(website.idgetTruyen.image).src;

          var title = index.querySelector(website.idgetTruyen.title).innerText;

          var linkdoc = btoa(index.href);

          contentTruyen += `<div class="col-lg-4 col-md-6 col-sm-4 col-ms-6">
                <a
                    class="project project-warning"
                    href="/thong-tin/${btoa(arrTheloai.hostName)}/${linkdoc}"
                    id="9162527970550105079"
                    data-container="body"
                    data-toggle="popover"
                    data-trigger="hover"
                    data-placement="auto left"
                    data-html="true"
                >
                    <div class="img-project-container">
                        <div class="img-project" style="background-image: url('${linkImage}');"></div>
                    </div>
                    <div class="project-content">
                        <div class="title-project-container"><div class="title-project">${title}</div></div>
                    </div>
                </a>
            </div>
            `;
        }

        $(setting.idXuattruyen).html(contentTruyen);

        this.paginnation(website, setting);

        //

        //   console.log(contentTruyen);

        // console.log(urlTruyen);
      },
      error: () => {
        alert("Xin vui lòng cài đặt extension.");
      },
    });
  }

  paginnation(website, setting) {
    $.ajax({
      url: website.translate
        ? setting.urlDich + website.getPage.link
        : website.getPage.link,
      type: "GET",
      success: (xhr) => {
        var contentTruyen = "";
        var getContent = $(xhr).find("#contentframe").attr("srcdoc");
        var creatElement = document.createElement("html");
        creatElement.innerHTML = getContent;
        var dataPage = "";
        creatElement.querySelectorAll(website.getPage.id).forEach((data) => {
          if (data.innerText == website.getPage.name) {
            dataPage = data.href;
          }
        });
        var decodeURIPage = +decodeURIComponent(dataPage).split(
          website.getPage.suaLink.sua
        )[website.getPage.suaLink.doi];
        var totalPage = decodeURIPage;

        Function.paginnation({
          page: Function.getQueryVariable("page")
            ? Function.getQueryVariable("page")
            : 1,
          numPages: totalPage,
          idbtPagination: "#pagination-project ul.pagination",
        });

        //   console.log(contentTruyen);

        // console.log(urlTruyen);
      },
      error: () => {
        alert("Xin vui lòng cài đặt extension.");
      },
    });
  }
}

new Main();
