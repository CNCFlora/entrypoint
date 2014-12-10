
$(function(){

    var user={"roles":[]};

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

});

