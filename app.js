const express=require("express");
const bodyparser=require("body-parser");
const ejs=require("ejs");
const _  =require("lodash");
var posts=[];
const homeStartingContent = "A blog is a type of website where the content is presented in reverse chronological order (newer content appear first). Blog content is often referred to as entries or blog posts." ;
 
const aboutContent = "Blogs evolved from online diaries and journals in the mid-90s. At that time, internet users were already running personal web pages where they published regular updates about their personal lives, thoughts, and social commentary. ";
const contactContent = "Blogs are a type of website. The only real difference between a blog and other types of website is that blogs are updated on a regular basis with new content, which is displayed in reverse chronological order (new blog posts first). ";

const app=express();
app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static("public"));

app.get("/",function(req,res)
{
res.render("home",{para : homeStartingContent , postarray:posts});

});

app.get("/contact",function(req,res)
{
    res.render("contact",{paracontact:contactContent});
});
app.get("/about",function(req,res)
{
    res.render("about",{paraabout:aboutContent});
});

app.get("/compose",function(req,res)
{
    res.render("compose");
});
app.post("/compose",function(req,res)
{
    var post={
         posttitle: req.body.titleinput ,
         postbody: req.body.postinput 
    };

    posts.push(post);
    res.redirect("/");
});
/*

app.get("/posts/:newp",function(req,res)
{
//this is Express route parameters----> take reference from google. We use to take a particular section of the webpage to separate page.
    console.log(req.params.newp);
})

*/

app.get("/posts/:newp",function(req,res)
{
    // localhost:3000/posts/Day-1 ----> value of newp here is Day-1 but requestedtitle will have day 1 bacause of the use of lodash function of string lowercase.
    let requestedtitle= _.lowerCase(req.params.newp);
    
    posts.forEach(function(post)
    {
        let storedtitle=_.lowerCase(post.posttitle);
        if(storedtitle==requestedtitle)
        {
            //everytime we match the title .....we will output that post in a separate "post.ejs" file.
        res.render("post",{requestedtitle:post.posttitle ,
        requestedpost:post.postbody
        
        });
        
    }
    });
    
});


app.listen(process.env.PORT||3000,function()
{
    console.log("server is running at port 3000");
}
);
 

