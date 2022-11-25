const express=require("express");
const dotenv=require("dotenv");
const bodyparser=require("body-parser");
 const mongoose=require("mongoose");
const ejs=require("ejs");
const _  =require("lodash");

const homeStartingContent = "A blog is a type of website where the content is presented in reverse chronological order (newer content appear first). Blog content is often referred to as entries or blog posts." ;
 
const aboutContent = "Blogs evolved from online diaries and journals in the mid-90s. At that time, internet users were already running personal web pages where they published regular updates about their personal lives, thoughts, and social commentary. ";
const contactContent = "Blogs are a type of website. The only real difference between a blog and other types of website is that blogs are updated on a regular basis with new content, which is displayed in reverse chronological order (new blog posts first). ";

const app=express();
app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static("public"));
dotenv.config({path: './config.env'});
const PORT =process.env.PORT||5000;

mongoose.connect(process.env.DATABASE);
//posts.push(homeStartingContent);
const blogSchema={
    title: String,
    content: String
}
const posts=mongoose.model("posts",blogSchema);
// var item1=new posts({
//     title:"day1",
//     content:"this is pandey "
// })
// item1.save();

app.get("/",function(req,res)
{
    var postarr=[];
   posts.find({},(err,results)=>
    {
        res.render("home",{para : homeStartingContent , postarray:results});
    //     postarr.push(results);
    //    console.log(results);
    })
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
app.post("/compose",async function(req,res)
{
    var postItem= new posts({
        title: req.body.titleinput,
        content: req.body.postinput 
    });
 await postItem.save();
   // posts.push(post);
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
    let requestedid= req.params.newp;
    
    posts.findOne({_id:requestedid},(err,result)=>
    {
        // let storedtitle=_.lowerCase(post.posttitle);
        // if(storedtitle==requestedtitle)
        // {
        //     //everytime we match the title .....we will output that post in a separate "post.ejs" file.
        // res.render("post",{requestedtitle:post.posttitle ,
        // requestedpost:post.postbody
        
        // });

        res.render("post",{requestedtitle:result.title,requestedpost: result.content})
        
    }
    );
    
});

app.get("/delete/:newp",  async (req,res)=>{
    var reqId=req.params.newp;
 /* 
 one method of deleting is this: with out using async -->
 posts.deleteOne({_id:reqId},(err)=>{
    if(!err)
    res.redirect("/");
  });
  */
 await posts.deleteOne({_id:reqId})
  res.redirect("/");
})


app.listen(PORT,function()
{
    console.log(`server is running at port ${PORT}`);
}
);
 

