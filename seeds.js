var mongoose 	= require("mongoose"),
Page	 		= require("./models/page"),
Comment   		= require("./models/comment");
 
var data = [
    {
        name: "Counter-Strike, de_dust2", 
        image: "https://memy.pl/show/big/uploads/Post/303993/15797323089608.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Kiedyś to było..", 
        image: "https://www.gry-online.pl/galeria/forum/6/614449335_865_small.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Kotecek", 
        image: "https://i.ytimg.com/vi/4xkSnuKQgZA/hqdefault.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Piesio", 
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv_SOr0O_fE5quaY6nvnm8juaDE6SMbUoUBPBZS3LtvwIx8bbb&s",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
]
 
function seedDB(){
   //Remove all pages
   Page.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed pages!");
        Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
             //add a few pages
            data.forEach(function(seed){
                Page.create(seed, function(err, page){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a page");
                        //create a comment
                        Comment.create(
                            {
                                text: "To jest jakiś treściwy komentarz",
                               author: "asd"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    page.comments.push(comment);
                                    page.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
        });
    });
    //add a few comments
}

module.exports = seedDB;
