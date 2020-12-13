const express = require('express');
const { Op} =require('sequelize');
const { Post, User,Image,Comment } =require('../models');
const router = express.Router();

router.get('/', async (req,res,next)=>{
    try{
    const where={};
      if(parseInt(req.query.lastId,10)){//초기로딩이 아닐떄
        where.id = { [Op.lt] : parseInt(req.query.lastId,10)};
      }
    const posts = await Post.findAll({
        where,
        limit:10,
        order:[
            [ 'createdAt', 'DESC' ],
            [Comment, 'createdAt', 'DESC']
        ],
        include:[{
            model: User,
            attributes:['id','nickname'],
        },{
            model:Image,
        },{
            model:Comment,
            include:[{
                model:User,
                attributes:['id','nickname'],
            }],
        },{
            model :User,
            as: 'Likers',
            attributes:['id']
          },{
            model:Post,
            as:'RetweetId',
            include:[{
                model:User,
                attributes:['id','nickname'],
            },{
                model:Image,
            }]
        },]        
        //limit :10,  <--10개만 가져와라
        //offset:0,  <--1~10  offset:10 <--11~20 가져오라는것
        //치명적결함 들고오는도중 추가하거나 삭제하면 그거를 포함해서 10개를 다시세기때문에
        // 하나가 비거나 하나가 중복되거나 하는 상황이 발생함
        //order:[[ 'createdAt', 'DESC' ]] 최신게시물부터 들고오는법 옛날꺼부터하려면 'ASC'
        //그래서 limit 과 lastId 방식을 많이사용함
    });
    res.status(200).json(posts);

    }catch(error){
        console.error(error);
        next(error);
    }

});



module.exports =router;