module.exports = (sequelize, DataTypes) => {
 const User = sequelize.define('User', {   //MYSQL에는 users로 저장됨
    email: { 
        type: DataTypes.STRING(30),
        allowNull: false,  //필수여부 false 면 필수
        unique: true,  //고유한값
    },//컬럼 실제 데이터는 로우
    nickname: {
        type: DataTypes.STRING(30),
        allowNull: false, 
    },
    password:{
        type: DataTypes.STRING(100),
        allowNull: false, 
    },
 },{
    charset:'utf8',
    collate: 'utf8_general_ci',
 });

 User.associate= (db) =>{
     db.User.hasMany(db.Post);
     db.User.hasMany(db.Comment);
     db.User.belongsToMany(db.Post, { through :'Like', as: 'Liked'})
     db.User.belongsToMany(db.User, { through :'Follow', as: 'Followers', foreignKey:'FollowingId'})
     db.User.belongsToMany(db.User, { through :'Follow', as: 'Followings',foreignKey:'FollowerId'})
     
 };
 return User;
}