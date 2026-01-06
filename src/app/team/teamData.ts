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

    // Web & App Dev
    { id: "tech", name: "Web & App Dev", title: "The Tech Virtuosos", parentId: "Celesta-Team" },
    { id: "naitik", name: "Naitik", title: "Coordinator", parentId: "tech", image: "#", linkedin: "#", x: "#" },
    { id: "diptanshu", name: "Diptanshu Saurav", title: "Coordinator", parentId: "tech", image: "/team-images/Diptanshu.jpg", linkedin: "#", x: "#" },

    // Committees
    { id: "Committees", name: "All Committees", title: "The Performers", parentId: "Celesta-Team" },

    // Hospitality
    { id: "hospitality", name: "Hospitality", title: "The Ambassadors of Welcome", parentId: "Committees" },
    { id: "sparsh", name: "Sparsh Choudhary", title: "Coordinator", parentId: "hospitality", image: "/team-images/sparsh.jpeg", linkedin: "#", x: "#" },
    { id: "nisha", name: "Kumari Nisha", title: "Coordinator", parentId: "hospitality", image: "#", linkedin: "#", x: "#" },
    { id: "vidhan", name: "Vidhan Bansal", title: "Coordinator", parentId: "hospitality", image: "/team-images/vidhan.jpg", linkedin: "#", x: "#" },

    // Creative & Design
    { id: "creative", name: "Creative & Design", title: "The Visual Architects", parentId: "Committees" },
    { id: "saurabh", name: "Saurabh Sankhla", title: "Coordinator", parentId: "creative", image: "#", linkedin: "#", x: "#" },
    { id: "lohitaksha", name: "Lohitaksha Guha", title: "Coordinator", parentId: "creative", image: "#", linkedin: "#", x: "#" },
    { id: "rishit", name: "Rishit Dutta", title: "Coordinator", parentId: "creative", image: "#", linkedin: "#", x: "#" },
    { id: "tanuj", name: "Tanuj Pitta", title: "Coordinator", parentId: "creative", image: "#", linkedin: "#", x: "#" },

    // Sponsorship
    { id: "sponsorship", name: "Sponsorship", title: "The Partnership Pioneers", parentId: "Committees" },
    { id: "yatharth", name: "Yatharth Gupta", title: "Coordinator", parentId: "sponsorship", image: "/team-images/Yatharth.jpg", linkedin: "#", x: "#" },
    { id: "sanit", name: "Sanit Sinha", title: "Coordinator", parentId: "sponsorship", image: "/team-images/Sanit.jpg", linkedin: "#", x: "#" },
    { id: "shaurya", name: "Shaurya Kumar", title: "Coordinator", parentId: "sponsorship", image: "/team-images/Shaurya.jpg", linkedin: "#", x: "#" },
    { id: "bhumi", name: "Bhumi Garg", title: "Coordinator", parentId: "sponsorship", image: "/team-images/Bhumi.jpg", linkedin: "#", x: "#" },

    // Events
    { id: "events", name: "Events", title: "The Experience Engineers", parentId: "Committees" },
    { id: "aayush", name: "Aayush Sheth", title: "Coordinator", parentId: "events", image: "/team-images/aayush.jpg", linkedin: "#", x: "#" },
    { id: "atharva", name: "Atharva Pawar", title: "Coordinator", parentId: "events", image: "/team-images/Atharva.jpg", linkedin: "#", x: "#" },
    { id: "sreyas", name: "Sreyas Kotha", title: "Coordinator", parentId: "events", image: "/team-images/sreyas.jpg", linkedin: "#", x: "#" },

    // Flagship
    { id: "flagship", name: "Flagship", title: "The Mainstage Mavericks", parentId: "Committees" },
    { id: "nakshatra", name: "Nakshatra Kanchan", title: "Coordinator", parentId: "flagship", image: "/team-images/nakshatra.jpg", linkedin: "#", x: "#" },
    { id: "viraj", name: "Viraj Kulkarni", title: "Coordinator", parentId: "flagship", image: "/team-images/viraj.jpg", linkedin: "#", x: "#" },
    { id: "jayinaksha", name: "Jayinaksha Vyas", title: "Coordinator", parentId: "flagship", image: "/team-images/vyas.jpg", linkedin: "#", x: "#" },
    { id: "ashutosh", name: "Ashutosh Kanojia", title: "Coordinator", parentId: "flagship", image: "/team-images/ashutosh.jpg", linkedin: "#", x: "#" },
    { id: "srikant", name: "Srikant Sahoo", title: "Coordinator", parentId: "flagship", image: "#", linkedin: "#", x: "#" },
    { id: "tushar", name: "Tushar Srivastava", title: "Coordinator", parentId: "flagship", image: "#", linkedin: "#", x: "#" },

    // MPR
    { id: "mpr", name: "MPR", title: "The Buzz Brigade", parentId: "Committees" },
    { id: "shaswat", name: "Shaswat Suman", title: "Coordinator", parentId: "mpr", image: "/team-images/shaswat.jpg", linkedin: "#", x: "#" },
    { id: "maganjot", name: "Maganjot Singh", title: "Coordinator", parentId: "mpr", image: "#", linkedin: "#", x: "#" },
    { id: "taksh", name: "Taksh Bhawan", title: "Coordinator", parentId: "mpr", image: "/team-images/taksh.jpg", linkedin: "#", x: "#" },
    { id: "anvitha", name: "Anvitha Pr", title: "Coordinator", parentId: "mpr", image: "/team-images/Avnitha.jpeg", linkedin: "#", x: "#" },
    { id: "deepesh", name: "Deepesh Kumar", title: "Coordinator", parentId: "mpr", image: "/team-images/deepesh.jpg", linkedin: "#", x: "#" },

    // RSP
    { id: "rsp", name: "RSP", title: "The Engagement Gatekeepers", parentId: "Committees" },
    { id: "om", name: "Om Ronte", title: "Coordinator", parentId: "rsp", image: "/team-images/om.jpg", linkedin: "#", x: "#" },
    { id: "raqeeb", name: "Raqeeb Ansari", title: "Coordinator", parentId: "rsp", image: "/team-images/raqeeb.jpg", linkedin: "#", x: "#" },
    { id: "dhivyesh", name: "Dhivyesh R", title: "Coordinator", parentId: "rsp", image: "/team-images/dhivyesh.jpg", linkedin: "#", x: "#" },
    { id: "ajay", name: "Ajay Kumar", title: "Coordinator", parentId: "rsp", image: "/team-images/ajay.jpg", linkedin: "#", x: "#" },

    // GL&E
    { id: "gle", name: "GL&E", title: "The Knowledge Curators", parentId: "Committees" },
    { id: "devashish", name: "Devashish Vaddi", title: "Coordinator", parentId: "gle", image: "#", linkedin: "#", x: "#" },
    { id: "ashish", name: "Ashish Yadav", title: "Coordinator", parentId: "gle", image: "#", linkedin: "#", x: "#" },
    { id: "aditya", name: "Aditya Satpute", title: "Coordinator", parentId: "gle", image: "#", linkedin: "#", x: "#" },

    // Workshop
    { id: "workshop", name: "Workshop", title: "The Skill Architects", parentId: "Committees" },
    { id: "abhijat", name: "Abhijat Jha", title: "Coordinator", parentId: "workshop", image: "/team-images/abhijat.jpg", linkedin: "#", x: "#" },
    { id: "nishant", name: "Nishant Kumar", title: "Coordinator", parentId: "workshop", image: "#", linkedin: "#", x: "#" },
];