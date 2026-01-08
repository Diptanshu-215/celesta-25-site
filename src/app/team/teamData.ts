// team/teamData.ts

export interface TeamMember {
    id: string;
    parentId: string | null;
    name: string;
    title: string;
    image?: string;
    linkedin?: string;
    x?: string;
}

export const teamData: TeamMember[] = [
    { id: "Celesta-Team", name: "Team Celesta", title: "The Torch Bearers", parentId: null },

    // Overall Fest Coordinators
    { id: "fest-coords", name: "Overall Fest Coordinators", title: "The Chiefs", parentId: "Celesta-Team" },
    { id: "abhitesh", name: "Abhitesh Shukla", title: "Fest Coordinator", parentId: "fest-coords", image: "#", linkedin: "#", x: "#" },
    { id: "ananta", name: "Ananta Nanda", title: "Fest Coordinator", parentId: "fest-coords", image: "#", linkedin: "#", x: "#" },

    
    // Committees
    { id: "Committees", name: "All Committees", title: "The Performers", parentId: "Celesta-Team" },

    // Web & App Dev
    { id: "tech", name: "Developers", title: "The Tech Virtuosos", parentId: "Celesta-Team" },
    { id: "naitik", name: "Naitik", title: "Coordinator", parentId: "tech", image: "#", linkedin: "#", x: "#" },
    { id: "diptanshu", name: "Diptanshu Saurav", title: "Coordinator", parentId: "tech", image: "/team-images/Diptanshu.jpg", linkedin: "#", x: "#" },


    // Hospitality
    { id: "hospitality", name: "Hospitality", title: "The Ambassadors of Welcome", parentId: "Committees" },
    { id: "sparsh", name: "Sparsh Choudhary", title: "Coordinator", parentId: "hospitality", image: "/team-images/sparsh.jpeg", linkedin: "www.linkedin.com/in/ sparsh-choudhary-7604aa28a", x: "#" },
    { id: "nisha", name: "Kumari Nisha", title: "Coordinator", parentId: "hospitality", image: "/team-images/nisha.jpeg", linkedin: "https://www.linkedin.com/in/kumari-nisha-3209b02a2?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", x: "#" },
    { id: "vidhan", name: "Vidhan Bansal", title: "Coordinator", parentId: "hospitality", image: "/team-images/vidhan.jpg", linkedin: "https://www.linkedin.com/in/vidhan-bansal-9bb784290/", x: "#" },

    // Creative & Design
    { id: "creative", name: "Creative & Design", title: "The Visual Architects", parentId: "Committees" },
    { id: "saurabh", name: "Saurabh Sankhla", title: "Coordinator", parentId: "creative", image: "#", linkedin: "http://linkedin.com/in/saurabhsankhla2005", x: "#" },
    { id: "lohitaksha", name: "Lohitaksha Guha", title: "Coordinator", parentId: "creative", image: "/team-images/lohitaksha.JPG", linkedin: "https://www.linkedin.com/in/lohitaksha-guha-661651298?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app", x: "#" },
    { id: "rishit", name: "Rishit Dutta", title: "Coordinator", parentId: "creative", image: "#", linkedin: "#", x: "#" },
    { id: "jyoti", name: "Jyoti Sikha", title: "Coordinator", parentId: "creative", image: "/team-images/jyoti.jpg", linkedin: "https://www.linkedin.com/in/jyoti-shikha2007/", x: "#" },
    { id: "tanuj", name: "Tanuj Pitta", title: "Coordinator", parentId: "creative", image: "#", linkedin: "https://www.linkedin.com/in/pitta-tanuj-753188280", x: "#" },

    // Sponsorship
    { id: "sponsorship", name: "Sponsorship", title: "The Partnership Pioneers", parentId: "Committees" },
    { id: "yatharth", name: "Yatharth Gupta", title: "Coordinator", parentId: "sponsorship", image: "/team-images/Yatharth.jpg", linkedin: "#", x: "#" },
    { id: "sanit", name: "Sanit Sinha", title: "Coordinator", parentId: "sponsorship", image: "/team-images/Sanit.jpg", linkedin: "#", x: "#" },
    { id: "shaurya", name: "Shaurya Kumar", title: "Coordinator", parentId: "sponsorship", image: "/team-images/Shaurya.jpg", linkedin: "https://www.linkedin.com/shauryakmaurya/", x: "#" },
    { id: "bhumi", name: "Bhumi Garg", title: "Coordinator", parentId: "sponsorship", image: "/team-images/Bhumi.jpg", linkedin: "#", x: "#" },

    // Events
    { id: "events", name: "Events", title: "The Experience Engineers", parentId: "Committees" },
    { id: "aayush", name: "Aayush Sheth", title: "Coordinator", parentId: "events", image: "/team-images/aayush.jpg", linkedin: "#", x: "#" },
    { id: "atharva", name: "Atharva Pawar", title: "Coordinator", parentId: "events", image: "/team-images/Atharva.jpg", linkedin: "https://www.linkedin.com/in/atharva-pawar-a58b272b9?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", x: "#" },
    { id: "sreyas", name: "Sreyas Kotha", title: "Coordinator", parentId: "events", image: "/team-images/sreyas.jpg", linkedin: "#", x: "#" },

    // Flagship
    { id: "flagship", name: "Flagship", title: "The Mainstage Mavericks", parentId: "Committees" },
    { id: "nakshatra", name: "Nakshatra Kanchan", title: "Coordinator", parentId: "flagship", image: "/team-images/nakshatra.jpg", linkedin: "https://www.linkedin.com/in/nakshatra-kanchan", x: "#" },
    { id: "viraj", name: "Viraj Kulkarni", title: "Coordinator", parentId: "flagship", image: "/team-images/viraj.jpg", linkedin: "https://www.linkedin.com/in/viraj-kulkarni-097869312?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app", x: "#" },
    { id: "jayinaksha", name: "Jayinaksha Vyas", title: "Coordinator", parentId: "flagship", image: "/team-images/vyas.jpg", linkedin: "https://www.linkedin.com/in/jayinaksha-vyas-974051283?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", x: "#" },
    { id: "ashutosh", name: "Ashutosh Kanojia", title: "Coordinator", parentId: "flagship", image: "/team-images/ashutosh.jpg", linkedin: "#", x: "#" },
    { id: "srikant", name: "Srikant Sahoo", title: "Coordinator", parentId: "flagship", image: "#", linkedin: "#", x: "#" },
    { id: "tushar", name: "Tushar Srivastava", title: "Coordinator", parentId: "flagship", image: "#", linkedin: "https://www.linkedin.com/in/tushar-shrivastav-7333b9298?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", x: "#" },

    // MPR
    { id: "mpr", name: "MPR", title: "The Buzz Brigade", parentId: "Committees" },
    { id: "shaswat", name: "Shaswat Suman", title: "Coordinator", parentId: "mpr", image: "/team-images/shaswat.jpg", linkedin: "https://www.linkedin.com/in/shaswat-suman-7041a82a0?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app", x: "#" },
    { id: "maganjot", name: "Maganjot Singh", title: "Coordinator", parentId: "mpr", image: "/team-images/maganjot.webp", linkedin: "https://www.linkedin.com/in/maganjot-singh-aa80a5214", x: "#" },
    { id: "taksh", name: "Taksh Bhawan", title: "Coordinator", parentId: "mpr", image: "/team-images/taksh.jpg", linkedin: "#", x: "#" },
    { id: "anvitha", name: "Anvitha Pr", title: "Coordinator", parentId: "mpr", image: "/team-images/Avnitha.jpeg", linkedin: "#", x: "#" },
    { id: "deepesh", name: "Deepesh Kumar", title: "Coordinator", parentId: "mpr", image: "/team-images/deepesh.jpg", linkedin: "#", x: "#" },

    // RSP
    { id: "rsp", name: "RSP", title: "The Engagement Gatekeepers", parentId: "Committees" },
    { id: "om", name: "Om Ronte", title: "Coordinator", parentId: "rsp", image: "/team-images/om.jpg", linkedin: "https://www.linkedin.com/in/om-ronte/", x: "#" },
    { id: "raqeeb", name: "Raqeeb Ansari", title: "Coordinator", parentId: "rsp", image: "/team-images/raqeeb.jpg", linkedin: "https://www.linkedin.com/in/raqeeb-ansari-330a86298/", x: "#" },
    { id: "dhivyesh", name: "Dhivyesh R", title: "Coordinator", parentId: "rsp", image: "/team-images/dhivyesh.jpg", linkedin: "#", x: "#" },
    { id: "ajay", name: "Ajay Kumar", title: "Coordinator", parentId: "rsp", image: "/team-images/ajay.jpg", linkedin: "http://linkedin.com/in/ajay-kumar-saini-44b99a284", x: "#" },

    // GL&E
    { id: "gle", name: "GL&E", title: "The Knowledge Curators", parentId: "Committees" },
    { id: "devashish", name: "Devashish Vaddi", title: "Coordinator", parentId: "gle", image: "/team-images/devasish.jpg", linkedin: "https://www.linkedin.com/in/devasish-vaddi-022452289?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", x: "#" },
    { id: "ashish", name: "Ashish Yadav", title: "Coordinator", parentId: "gle", image: "/team-images/ashish.webp", linkedin: "#", x: "#" },
    { id: "aditya", name: "Aditya Satpute", title: "Coordinator", parentId: "gle", image: "#", linkedin: "https://www.linkedin.com/in/aditya-satpute-b46831291?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", x: "#" },

    // Workshop
    { id: "workshop", name: "Workshop", title: "The Skill Architects", parentId: "Committees" },
    { id: "abhijat", name: "Abhijat Jha", title: "Coordinator", parentId: "workshop", image: "/team-images/abhijat.jpg", linkedin: "#", x: "#" },
    { id: "nishant", name: "Nishant Kumar", title: "Coordinator", parentId: "workshop", image: "#", linkedin: "#", x: "#" },
];