
function render(sel) {
  var tmpl = document.querySelector(sel);
  var frag = tmpl.content;
  var el = frag.cloneNode(true);

  el.to= function(sel) { document.querySelector(sel).innerHTML = el; }
  el.into= function(sel) { document.querySelector(sel).appendChild(el); }

  return el;
}

window.onload = function() {

    var user={"roles":[]};

    if(typeof Connect == 'function') {
      Connect({
          context: "entry",
          onlogin: function(u) {
              user=u;
              $("#login").hide();
              $("#who span").text(u.name);
              if(u.roles) {
                for(var c in u.roles) {
                    html = "<li>"+u.roles[c].context+"<ul>";
                    if(u.roles[c].roles) {
                      for(var i in u.roles[c].roles) {
                          html += "<li>"+u.roles[c].roles[i].role+"<ul>";
                          if(u.roles[c].entities) {
                            for(var ii in u.roles[c].roles[i].entities) {
                                html += "<li>"+u.roles[c].roles[i].entities[ii].name+"</li>";
                            }
                          }
                          html += "</ul></li>";
                      }
                    }
                    html += "</ul></li>";
                    $("#who>ul").append(html);
                }
              }
          },
          onlogout: function() {
              $("#login").show();
              $("#who>p>span").text("");
          }
      });
      $("#login").click(function(){  Connect.login(); });
      $("#logout").click(function(){  Connect.logout(); });
    }


    recortes();

    function recortes() {
      $.getJSON("/couchdb/_all_dbs",function(data) {
          for(var i in data) {
            var db = data[i];
            if(!db.match(/^_/) && !db.match(/_history$/)) {
              var recorte =render('#recorte-tmpl');
              recorte.querySelector(".db_name").innerHTML=db.replace(/_/g," ");
              var links = recorte.querySelectorAll("a");
              for(var l=0;l<links.length;l++) {
                var link = links[l];
                var href = link.getAttribute("href");
                if(href.match(/db/)) {
                  link.setAttribute("href",href.replace("{{db}}",db));
                }
              }

              recorte.into("#recortes");
            }
          }
      });
    }

}
