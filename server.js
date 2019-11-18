const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.get("/", function(req, res) {
    const data = {
        avatar_url: "https://images-na.ssl-images-amazon.com/images/I/912NWYf5XkL._SL1500_.jpg",
        name: "Tool",
        musicians: "Danny Carey, Adam Jones, Maynard James Keenan and Justin Chancellor",
        about: "One of the leading American metal acts of the '90s, with a sophisticated art rock approach marked by unrelenting aggression and focused intensity.",
        links: [
            { name: "Twitter", url: "https://twitter.com/tool" },
            { url: "https://store.toolband.com/", name: "Store" },
            { url: "https://www.youtube.com/channel/UC1wUo-29zS7m_Jp-U_xYcFQ", name: "Youtube channel" },
            { url: "https://www.alexgrey.com/", name: "Alex Grey" }
        ]
    }

    return res.render("about", { data })
})

server.get("/lives", function(req, res) {
    return res.render("lives", { items: videos })
})

server.get("/video", function(req, res) {
    const id = req.query.id

    const video = videos.find(function(video){
        return video.id == id
    })

    if (!video) {
        return res.send("Video not found")
    }

    return res.render("video", { item: video })
})

server.listen(5000, function() {
    console.log("Server is running")
})