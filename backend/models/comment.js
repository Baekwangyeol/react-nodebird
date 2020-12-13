module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {   //MYSQL에는 users로 저장됨
       
        content:{
            type: DataTypes.TEXT,
            allowNull:false,
        },
   
    },{
       charset:'utf8mb4',  //mb4를추가해야 이모티콘도적용
       collate: 'utf8mb4_general_ci', 
    });
   
    Comment.associate= (db) =>{
        db.Comment.belongsTo(db.User);
        db.Comment.belongsTo(db.Post);
    };
    return Comment;
   }