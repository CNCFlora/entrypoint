
$(function(){

    var user={"roles":[]};

    Connect({
        context: "entry",
        onlogin: function(u) {
            user=u;
            $("#login").hide();
            $("#who span").text(u.name);
            for(var c in u.roles) {
                html = "<li>"+u.roles[i].context+"<ul>";
                for(var i in u.roles[c].roles) {
                    var html = "<li>"+u.roles[c].roles[i].role+"<ul>";
                    for(var ii in u.roles[c].roles[i].entities) {
                        html += "<li>"+u.roles[c].roles[i].entities[ii].name+"</li>";
                    }
                    html += "</ul></li>";
                }
                html += "</ul></li>";
                $("#who>ul").append(html);
            }
            //check();
        },
        onlogout: function() {
            $("#login").show();
            $("#who>p>span").text("");
        }
    });

    $("#login").click(function(){  Connect.login(); });

});

