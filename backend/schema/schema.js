const graphql = require('graphql');
const User = require('../models/User');
const Restaurant = require('../models/Restaurant');
const Order = require('../models/Order');
const RestEvent = require('../models/Event');
const { GraphQLDateTime } = require('graphql-iso-date');
const { response } = require('express');
const { getToken, encryptPassword, comparePassword } = require("../config/passport")
const {
    AuthenticationError,
} = require('apollo-server');
const aws = require('aws-sdk');


const {
    GraphQLObjectType, GraphQLString, GraphQLInputObjectType,
    GraphQLID, GraphQLInt, GraphQLSchema,
    GraphQLList, GraphQLFloat, GraphQLNonNull
} = graphql;


const UserType = new GraphQLObjectType({
    name: 'User',
    //We are wrapping fields in the function as we dont want to execute this ultil 
    //everything is inilized. For example below code will throw error AuthorType not 
    //found if not wrapped in a function
    fields: () => ({
        _id: { type: new GraphQLNonNull(GraphQLID) },
        user_name: { type: GraphQLString },
        fname: { type: GraphQLString },
        lname: { type: GraphQLString },
        Emailid: { type: GraphQLString },
        mobile: { type: GraphQLString },
        userpass: { type: GraphQLString },
        image: { type: GraphQLString },
        ts: { type: GraphQLDateTime },
        dob: { type: GraphQLDateTime },
        city: { type: GraphQLString },
        country: { type: GraphQLString },
        path: { type: GraphQLString },
        bio: { type: GraphQLString },
        favorites: { type: GraphQLString },
        username: { type: GraphQLString },
        zipcode: { type: GraphQLString },
        things_i_love: { type: GraphQLString },
        find_me_in: { type: GraphQLString },
        myblog: { type: GraphQLString },
        ustate: { type: GraphQLString },
        nick_name: { type: GraphQLString },
        headline: { type: GraphQLString },
        // registeredEvents: {
        //     type: new GraphQLList(EventType),
        //     resolve: (parent, args) => {
        //         return RestEvent.find({ _id: { $in: parent.registeredEvents } })
        //     }
        // },
        followedUser: {
            type: new GraphQLList(UserType),
            resolve: (parent, args) => {
                return User.find({ _id: { $in: parent.followedUser } })
            }
        },
        yelpingsince: { type: GraphQLDateTime },
    })

});


const RestaurantType = new GraphQLObjectType({
    name: 'Restaurant',
    //We are wrapping fields in the function as we dont want to execute this ultil 
    //everything is inilized. For example below code will throw error AuthorType not 
    //found if not wrapped in a function
    fields: () => ({
        _id: { type: GraphQLID },
        restaurantname: { type: GraphQLString },
        location: { type: GraphQLString },
        restpass: { type: GraphQLString },
        Emailid: { type: GraphQLString },
        rdescription: { type: GraphQLString },
        ts: { type: GraphQLDateTime },
        contactinfo: { type: GraphQLFloat },
        cuisine: { type: GraphQLString },
        timings: { type: GraphQLString },
        zipcode: { type: GraphQLInt },
        lat: { type: GraphQLString },
        lng: { type: GraphQLString },
        address: { type: GraphQLString },
        rating: { type: GraphQLString },
        modeofdelivery: { type: GraphQLString },
        delivery_method: { type: GraphQLString },
        website: { type: GraphQLString },
        path: { type: GraphQLString },
        path1: { type: GraphQLString },
        path2: { type: GraphQLString },
        path3: { type: GraphQLString },
        menu: { type: new GraphQLList(MenuType) },
        review: { type: new GraphQLList(ReviewType) }
    })

});


const MenuType = new GraphQLObjectType({
    name: 'Menu',
    fields: () => ({
        _id: { type: new GraphQLNonNull(GraphQLID) },
        itemname: { type: GraphQLString },
        price: { type: GraphQLString },
        item_description: { type: GraphQLString },
        path: { type: GraphQLString },
        itemcategory: { type: GraphQLString },
        quantity: { type: GraphQLString },
        Ingredients: { type: GraphQLString },

    })
});

const ReviewType = new GraphQLObjectType({
    name: 'Review',
    fields: () => ({
        _id: { type: new GraphQLNonNull(GraphQLID) },
        review_desc: { type: GraphQLString },
        rating: { type: GraphQLString },
        restaurant_id: { type: GraphQLID },
        path: { type: GraphQLString },
        order_id: { type: GraphQLID },
        user_id: { type: GraphQLID },
        email: { type: GraphQLString },
    })
});

const User_LRType = new GraphQLObjectType({
    name: 'User_LR',
    fields: () => ({
        user_name: { type: GraphQLString },
        _id: { type: GraphQLID },
        Emailid: { type: GraphQLString },
        token: { type: GraphQLString },
    })
})

const Restaurant_LRType = new GraphQLObjectType({
    name: 'Restuarant_LR',
    fields: () => ({
        _id: { type: GraphQLID },
        Emailid: { type: GraphQLString },
        token: { type: GraphQLString },
        restaurantname: { type: GraphQLString }
    })
})

const MeType = new GraphQLObjectType({
    name: 'Me',
    fields: () => {
        return {
            _id: { type: GraphQLNonNull(GraphQLID) },
            Emailid: { type: GraphQLNonNull(GraphQLString) },
            user_name: { type: GraphQLNonNull(GraphQLString) },
            restaurantname: { type: GraphQLNonNull(GraphQLString) },
            token: { type: GraphQLNonNull(GraphQLString) }
        }
    }
})

// const EventType = new GraphQLObjectType({
//     name: 'Event',
//     fields: () => ({
//         _id: { type: new GraphQLNonNull(GraphQLID) },
//         restaurant_id: { type: GraphQLID },
//         eventname: { type: GraphQLString },
//         eventdescription: { type: GraphQLString },
//         time: { type: GraphQLString },
//         date: { type: GraphQLString },
//         address: { type: GraphQLString },
//         city: { type: GraphQLString },
//         eventtype: { type: GraphQLString },
//         hashtag: { type: GraphQLString },
//         path: { type: GraphQLString },
//         RegistredUser: { type: GraphQLList(UserType) }
//     })


// })

const OrderType = new GraphQLObjectType({
    name: 'Order',
    fields: () => ({
        _id: { type: new GraphQLNonNull(GraphQLID) },
        restaurant_id: { type: GraphQLID },
        user_id: { type: GraphQLID },
        user_name: { type: GraphQLString },
        deliverymode: { type: GraphQLString },
        orderstatus: { type: GraphQLString },
        ts: { type: GraphQLDateTime },
        cart: { type: GraphQLList(CartType) }
    })
})

const CartType = new GraphQLObjectType({
    name: 'Cart',
    fields: () => ({
        _id: { type: new GraphQLNonNull(GraphQLID) },
        itemname: { type: GraphQLString },
        itemid: { type: GraphQLString },
        price: { type: GraphQLString },
        path: { type: GraphQLString },
        cartstatus: { type: GraphQLString },
        user_id: { type: GraphQLID },
        restaurant_id: { type: GraphQLID },
        user_name: { type: GraphQLString },
        restaurant_name: { type: GraphQLString }
    })
})


const s3PayloadType = new GraphQLObjectType({
    name: 's3Payload',
    fields: () => ({
        signedRequest: { type: GraphQLString },
        url: { type: GraphQLString }
    })
})



const order_by = new GraphQLInputObjectType({
    name: 'order_by',
    fields: () => ({
        fields: { type: GraphQLString },
        direction: { type: GraphQLInt }
    })
})


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        Me: {
            type: MeType,
            resolve(parent, args, context, info) {
                if (context.payload.loggedIn) {
                    return { _id: context.payload.payload._id, Emailid: context.payload.payload.Emailid }
                } else {
                    throw new AuthenticationError("Please Login Again!")
                }
            }
        },
        User: {
            type: GraphQLList(UserType),
            args: { _id: { type: GraphQLID }, fname: { type: GraphQLString }, city: { type: GraphQLString }, Emailid: { type: GraphQLString } },
            resolve(parent, args, context) {
                if (context.payload.loggedIn) {
                    return User.find({ ...args })
                } else {
                    throw new AuthenticationError("You are not authorised to access this resource.")
                }

            }
        },
        Restaurant: {
            type: GraphQLList(RestaurantType),
            args: { _id: { type: GraphQLID }, Emailid: { type: GraphQLString }, search: { type: GraphQLString } },
            resolve(parent, args, context) {
                if (context.payload.loggedIn) {
                    if (!args.search) {
                        return Restaurant.find({ ...args });
                    } else {
                        // Add search in case sensititve or full text with mongo OR use all fields as collected variable
                        return Restaurant.find({ $or: [{ _id: args._id }, { Emailid: args.Emailid }, { restaurantname: args.search }, { deliverymode: args.search }, { cuisine: args.search }, { location: args.search }, { modeofdelivery: args.search }, { "menu.itemname": args.search }] })
                    }
                } else {
                    throw new AuthenticationError("You are not authorised to access this resource.")
                }
            }
        },
        // Event: {
        //     type: GraphQLList(EventType),
        //     args: { _id: { type: GraphQLID }, restaurant_id: { type: GraphQLID }, eventname: { type: GraphQLString }, order_by: { type: order_by } },
        //     resolve(parent, args) {
        //         if (args.order_by && args.order_by.fields && args.order_by.direction) {
        //             var mysort = {};
        //             mysort[args.order_by.fields] = args.order_by.direction
        //             return RestEvent.find({}).sort(mysort)
        //         } else {
        //             return RestEvent.find({ ...args })
        //         }

        //     }
        // },
        Order: {
            type: GraphQLList(OrderType),
            args: { _id: { type: GraphQLID }, restaurant_id: { type: GraphQLString }, orderstatus: { type: GraphQLString }, user_id: { type: GraphQLString }, order_by: { type: order_by } },
            resolve(parent, args, context) {
                if (context.payload.loggedIn) {
                    if (args.order_by && args.order_by.fields && args.order_by.direction) {
                        var mysort = {};
                        mysort[args.order_by.fields] = args.order_by.direction
                        return Order.find({}).sort(mysort)
                    } else {
                        return Order.find({ ...args })
                    }
                } else {
                    throw new AuthenticationError("You are not authorised to access this resource.")
                }
            }
        },

    }


});


const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        LoginUser: {
            type: User_LRType,
            args: {
                Emailid: { type: new GraphQLNonNull(GraphQLString) },
                userpass: { type: new GraphQLNonNull(GraphQLString) }
            },
            async resolve(parent, args) {
                const user = await User.findOne({ Emailid: args.Emailid })
                if (user) {
                    const isMatch = await comparePassword(args.userpass, user.userpass)
                    if (isMatch) {
                        const token = getToken(user.toJSON())
                        return { Emailid: user.Emailid, user_name: user.user_name, _id: user._id, token };
                    } else {
                        console.log("here")
                        throw new AuthenticationError("Wrong Password!")
                    }
                } else {
                    throw new AuthenticationError("User does not exists")
                }


            }
        },
        RegisterUser: {
            type: User_LRType,
            args: {
                Emailid: { type: new GraphQLNonNull(GraphQLString) },
                userpass: { type: new GraphQLNonNull(GraphQLString) },
                zipcode: { type: new GraphQLNonNull(GraphQLString) },
                user_name: { type: new GraphQLNonNull(GraphQLString) }
            },
            async resolve(parent, args) {
                const newUser = { user_name: args.user_name, Emailid: args.Emailid, userpass: await encryptPassword(args.userpass), zipcode: args.zipcode }
                const user = await User.findOne({ Emailid: args.Emailid })
                if (user) {
                    throw new AuthenticationError("User Already Exists!")
                }
                try {
                    const regUser = (await User.create(newUser));
                    const token = getToken(regUser.toJSON());
                    return { _id: regUser._id, token, Emailid: regUser.Emailid, user_name: regUser.user_name, zipcode: regUser.zipcode }
                } catch (e) {
                    throw e
                }

            }
        },
        RegisterRestaurant: {
            type: Restaurant_LRType,
            args: {
                Emailid: { type: new GraphQLNonNull(GraphQLString) },
                restpass: { type: new GraphQLNonNull(GraphQLString) },
                restaurantname: { type: new GraphQLNonNull(GraphQLString) },
                location: { type: new GraphQLNonNull(GraphQLString) }

            },
            async resolve(parent, args) {

                const newRest = { restaurantname: args.restaurantname, Emailid: args.Emailid, restpass: await encryptPassword(args.restpass), location: args.location }
                const rest = await Restaurant.findOne({ Emailid: args.Emailid })
                if (rest) {
                    throw new AuthenticationError("Restaurant Already Exists!")
                }
                try {
                    const regRest = (await Restaurant.create(newRest));
                    const token = getToken(regRest.toJSON());
                    return { _id: regRest._id, token, Emailid: regRest.Emailid, restaurantname: regRest.restaurantname, location: regRest.location }
                } catch (e) {
                    throw e
                }

            }
        },
        LoginRestaurant: {
            type: Restaurant_LRType,
            args: {
                Emailid: { type: new GraphQLNonNull(GraphQLString) },
                restpass: { type: new GraphQLNonNull(GraphQLString) }
            },
            async resolve(parent, args) {

                const rest = await Restaurant.findOne({ Emailid: args.Emailid })
                if (rest) {
                    const isMatch = await comparePassword(args.restpass, rest.restpass)
                    if (isMatch) {
                        const token = getToken(rest.toJSON())
                        return { Emailid: rest.Emailid, restaurantname: rest.restaurantname, _id: rest._id, token };
                    } else {
                        throw new AuthenticationError("Wrong Password!")
                    }
                } else {
                    throw new AuthenticationError("Restaurant didn't exists!")
                }


            }
        },


        UpdateRestaurantProfile: {
            type: RestaurantType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                location: { type: new GraphQLNonNull(GraphQLString) },
                Emailid: { type: new GraphQLNonNull(GraphQLString) },
                rdescription: { type: new GraphQLNonNull(GraphQLString) },
                contactinfo: { type: new GraphQLNonNull(GraphQLFloat) },
                cuisine: { type: new GraphQLNonNull(GraphQLString) },
                timings: { type: new GraphQLNonNull(GraphQLString) },
                zipcode: { type: new GraphQLNonNull(GraphQLInt) },
                lat: { type: new GraphQLNonNull(GraphQLString) },
                lng: { type: new GraphQLNonNull(GraphQLString) },
                address: { type: new GraphQLNonNull(GraphQLString) },
                modeofdelivery: { type: new GraphQLNonNull(GraphQLString) },
                delivery_method: { type: new GraphQLNonNull(GraphQLString) },
                website: { type: new GraphQLNonNull(GraphQLString) },
                path: { type: new GraphQLNonNull(GraphQLString) },
                path1: { type: new GraphQLNonNull(GraphQLString) },
                path2: { type: new GraphQLNonNull(GraphQLString) },
                path3: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args, context) {
                if (context.payload.loggedIn) {

                    return Restaurant.findByIdAndUpdate(
                        { _id: args.id },
                        {
                            location: args.location,
                            Emailid: args.Emailid,
                            rdescription: args.rdescription,
                            contactinfo: args.contactinfo,
                            cuisine: args.cuisine,
                            timings: args.timings,
                            zipcode: args.zipcode,
                            website: args.website,
                            address: args.address,
                            lat: args.lat,
                            lng: args.lng,
                            modeofdelivery: args.modeofdelivery,
                            delivery_method: args.delivery_method,
                            path: args.path,
                            path1: args.path1,
                            path2: args.path2,
                            path3: args.path3
                        },
                        { new: true }, (error, results) => {
                            if (error) {
                                return error
                            } else {
                                return results
                            }
                        });
                } else {
                    throw new AuthenticationError("You are not authorised to access this resource.")
                }
            }
        },
        AddRestaurantMenu: {
            type: RestaurantType,
            args: {
                restaurant_id: { type: new GraphQLNonNull(GraphQLID) },
                itemname: { type: new GraphQLNonNull(GraphQLString) },
                price: { type: new GraphQLNonNull(GraphQLString) },
                item_description: { type: new GraphQLNonNull(GraphQLString) },
                path: { type: new GraphQLNonNull(GraphQLString) },
                itemcategory: { type: new GraphQLNonNull(GraphQLString) },
                quantity: { type: new GraphQLNonNull(GraphQLString) },
                Ingredients: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args, context) {
                if (context.payload.loggedIn) {

                    var objData = { itemname: args.itemname, price: args.price, item_description: args.item_description, path: args.path, itemcategory: args.itemcategory,quantity: args.quantity, Ingredients: args.Ingredients };
                    // Adding multiple same entries, can do anndiotnal validation (optional)
                    return Restaurant.findOneAndUpdate(
                        { _id: args.restaurant_id },
                        { $addToSet: { menu: objData } },
                        (error, results) => {
                            if (error) {
                                return error
                            } else {
                                return results
                            }
                        })
                } else {
                    throw new AuthenticationError("You are not authorised to access this resource.")
                }

            }
        },
        EditRestaurantMenu: {
            type: RestaurantType,
            args: {
                restaurant_id: { type: new GraphQLNonNull(GraphQLID) },
                menu_id: { type: new GraphQLNonNull(GraphQLID) },
                itemname: { type: new GraphQLNonNull(GraphQLString) },
                price: { type: new GraphQLNonNull(GraphQLString) },
                item_description: { type: new GraphQLNonNull(GraphQLString) },
                path: { type: new GraphQLNonNull(GraphQLString) },
                itemcategory: { type: new GraphQLNonNull(GraphQLString) },
                quantity: { type: new GraphQLNonNull(GraphQLString) },
                Ingredients: { type: new GraphQLNonNull(GraphQLString) },
            },
            async resolve(parent, args, context) {
                if (context.payload.loggedIn) {

                    let editMenu = await Restaurant.updateOne(
                        { _id: args.restaurant_id, "menu._id": args.menu_id },
                        { $set: { "menu.$.itemname": args.itemname, "menu.$.price": args.price, "menu.$.item_description": args.item_description, "menu.$.itemcategory": args.itemcategory, "menu.$.quantity": args.quantity, "menu.$.Ingredients": args.Ingredients, "menu.$.path": args.path } }
                        , { new: true }, (error, results) => {
                            if (error) {
                                return error
                            } else {
                                return results
                            }
                        });
                    if (!editMenu) {
                        return error
                    } else {
                        return Restaurant.findById(args.restaurant_id)
                    }

                } else {
                    throw new AuthenticationError("You are not authorised to access this resource.")
                }

            }
        },
        UpdateUserProfile: {
            type: UserType,
            args: {
                user_name: { type: GraphQLString },
                fname: { type: GraphQLString },
                lname: { type: GraphQLString },
                Emailid: { type: GraphQLString },
                mobile: { type: GraphQLString },
                image: { type: GraphQLString },
                dob: { type: GraphQLDateTime },
                city: { type: GraphQLString },
                country: { type: GraphQLString },
                path: { type: GraphQLString },
                bio: { type: GraphQLString },
                favorites: { type: GraphQLString },
                username: { type: GraphQLString },
                zipcode: { type: GraphQLString },
                things_i_love: { type: GraphQLString },
                find_me_in: { type: GraphQLString },
                myblog: { type: GraphQLString },
                ustate: { type: GraphQLString },
                nick_name: { type: GraphQLString },
                headline: { type: GraphQLString },
            },
            resolve(parent, args, context) {
                if (context.payload.loggedIn) {
                    return User.findByIdAndUpdate(
                        { _id: args.id },
                        {
                            user_name: args.user_name,
                            fname: args.fname,
                            lname: args.lname,
                            Emailid: args.Emailid,
                            mobile: args.mobile,
                            image: args.image,
                            dob: args.dob,
                            city: args.city,
                            country: args.country,
                            path: args.path,
                            bio: args.bio,
                            favorites: args.favorites,
                            username: args.username,
                            zipcode: args.zipcode,
                            things_i_love: args.things_i_love,
                            find_me_in: args.find_me_in,
                            myblog: args.myblog,
                            ustate: args.ustate,
                            nick_name: args.nick_name,
                            headline: args.headline,
                        },
                        { new: true }, (error, results) => {
                            if (error) {
                                return error
                            } else {
                                return results
                            }
                        });

                } else {
                    throw new AuthenticationError("You are not authorised to access this resource.")
                }

            }
        },
        AddRestaurantReview: {
            type: RestaurantType,
            args: {
                review_desc: { type: new GraphQLNonNull(GraphQLString) },
                rating: { type: new GraphQLNonNull(GraphQLString) },
                restaurant_id: { type: new GraphQLNonNull(GraphQLID) },
                path: { type: new GraphQLNonNull(GraphQLString) },
                order_id: { type: new GraphQLNonNull(GraphQLID) },
                user_id: { type: new GraphQLNonNull(GraphQLID) },
                email: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent,args, context) {
                if (context.payload.loggedIn) {

                    var objData = { review_desc: args.review_desc, rating: args.rating, path: args.path, order_id: args.order_id, user_id: args.user_id, email: args.email };
                    // Adding multiple same entries, can do anndiotnal validation (optional)
                    return Restaurant.findOneAndUpdate(
                        { _id: args.restaurant_id },
                        { $push: { review: objData } },
                        (error, results) => {
                            if (error) {
                                return "error"
                            } else {
                                return results
                            }
                        })

                } else {
                    throw new AuthenticationError("You are not authorised to access this resource.")
                }
            }
        },
        UpdateOrderStatus: {
            type: OrderType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLID) },
                orderstatus: { type: new GraphQLNonNull(GraphQLString) }
            },
            async resolve(parent, args, context) {
                if (context.payload.loggedIn) {
                    let updateOrder = await Order.updateOne({ _id: args._id }, { orderstatus: args.orderstatus }, { new: true }, (error, results) => {
                        if (error) {
                            return error
                        } else {
                            return results
                        }
                    })
                    if (!updateOrder) {
                        return "error"
                    } else {
                        return Order.findById(args._id)
                    }
                } else {
                    throw new AuthenticationError("You are not authorised to access this resource.")
                }
            }
        },
        CreateOrder: {
            type: OrderType,
            args: {
                _id: { type: GraphQLID },
                user_id: { type: GraphQLID },
                deliverymode: { type: GraphQLString },
            },
            async resolve(parent, args, context) {
                if (context.payload.loggedIn) {

                    let createOrder = await Order.updateOne({ _id: args._id, "cart.user_id": args.user_id },
                        { $set: { "cart.$.cartstatus": "done" }, deliverymode: args.deliverymode, orderstatus: "New Order", ts: Date.now() },
                        (error, results) => {
                            if (error) {
                                return error
                            } else {
                                return results
                            }
                        })
                    if (!createOrder) {
                        return "error"
                    } else {
                        return Order.findById(args._id)
                    }
                } else {
                    throw new AuthenticationError("You are not authorised to access this resource.")
                }

            }
        },
        AddToCart: {
            type: OrderType,
            args: {
                user_id: { type: GraphQLID },
                restaurant_id: { type: GraphQLID },
                user_name: { type: GraphQLString },
                itemname: { type: GraphQLString },
                itemid: { type: GraphQLID },
                price: { type: GraphQLString },
                path: { type: GraphQLString },
                restaurant_name: { type: GraphQLString }
            },
            async resolve(parent, args, context) {
                if (context.payload.loggedIn) {

                    var ObjData = { itemname: args.itemname, itemid: args._id, price: args.price, path: args.path, cartstatus: "New", user_id: args.user_id, restaurant_id: args.restaurant_id, restaurant_name: args.restaurant_name, user_name: args.user_name }
                    return Order.findOneAndUpdate(
                        { user_id: args.user_id, restaurant_id: args.restaurant_id, orderstatus: " " },
                        { restaurant_id: args.restaurant_id, user_name: args.user_name, orderstatus: " ", $addToSet: { cart: ObjData } }, { upsert: true }, (error, results) => {
                            if (error) {
                                return error
                            } else {
                                return results
                            }
                        })
                } else {
                    throw new AuthenticationError("You are not authorised to access this resource.")
                }
            }
        },
        signS3: {
            type: s3PayloadType,
            args: {
                filename: { type: new GraphQLNonNull(GraphQLString) },
                filetype: { type: new GraphQLNonNull(GraphQLString) },
            },
            async resolve(parent, args) {
                    const s3 = new aws.S3({
                        signatureVersion: 'v4',
                        secretAccessKey: "0am/9n/qQMhH4NnBJBasYvoM8enIMta/FirpNhAf",
                        accessKeyId: "AKIAIX7RODER3FW5UBIA",
                        region: "us-east-1",
                    });

                    const s3Params = {
                        Bucket: "yelpa",
                        Key: args.filename,
                        Expires: 60,
                        ContentType: args.filetype,
                        ACL: 'public-read',
                    };

                    const signedRequest = await s3.getSignedUrl('putObject', s3Params);
                    const url = `https://yelpa.s3.amazonaws.com/${args.filename}`;

                    return {
                        signedRequest,
                        url,
                    };


            }
        }
    }


});
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation

});