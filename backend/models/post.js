module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {   //MYSQL에는 users로 저장됨
       
        content:{
            type: DataTypes.TEXT,
            allowNull:false,
        },
   
        //UserId,ReteetId
    },{
       charset:'utf8mb4',  //mb4를추가해야 이모티콘도적용
       collate: 'utf8mb4_general_ci', 
    });
   
    Post.associate= (db) =>{
        db.Post.belongsTo(db.User);  //post.addUser, post.setUser(수정)
        db.Post.belongsToMany(db.Hashtag, { through : 'PostHashtag'}); //post.addHashtags
        db.Post.hasMany(db.Comment);   //post.addComments
        db.Post.hasMany(db.Image); //post.addImages
        db.Post.belongsToMany(db.User, { through :'Like', as:'Likers'}) //post.addLikers post.removeLikers
        db.Post.belongsTo(db.Post, { as:'RetweetId'})  //post.addRetweet
    };
    return Post;
   }