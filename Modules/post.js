import { USERS } from "./User.js";

export const POSTS = [{
        imageUrl: "https://i.picsum.photos/id/0/5616/3744.jpg?hmac=3GAAioiQziMGEtLbfrdbcoenXoWAW-zlyEAMkfEdBzQ",
        user: USERS[0].user,
        likes: 15,
        caption: "We need more dog parks!",
        profile_picture: USERS[0].image,
        comments: [{
                user: USERS[1].user,
                comment: "YES!!! "
                },
                {
                user: USERS[2].user,
                comment: "I've been looking for more places to take my dog! "
                }
        ],
    },
]