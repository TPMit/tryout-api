
const tryoutDS = require("@models").tryoutDetailSoals;
const tryoutD = require("@models").tryoutDetails;
const Soal = require("@models").soals;
const Choice = require("@models").choicesoals;
const TOD = require("@models").tryoutDetails;
const Matpel = require("@models").matpels;

class Tryoutdetailsoals{
    constructor(){
    }

    getTryoutDetailsoals(conditions){
        return new Promise(function(resolve,reject){
            this.fetchCondition(conditions)
            .then((condition)=>{
                tryoutDS.findAll({
                    where : condition,
                    offset: parseInt(conditions.offset),
                    limit : parseInt(conditions.limit),
                    order: [["id", "ASC"]],
                    include: [
                      {
                        model: tryoutD,
                        attributes: ["id","id_tryout","id_matpel","nilai","status"],
                      },
                      {
                        model: Soal,
                        attributes: ["soals","id_type","jawaban"],
                      }
                    ],
                })
                .then(async (tryoutds)=>{
                    let total = await tryoutDS.findAll()
                    resolve({total:total.length,data:tryoutds})
                })
                .catch(err=>{
                    reject(err)
                })
            })
            .catch(err=>{reject})
        }.bind(this))
    }
    fetchCondition(conditions){
        return new Promise(function(resolve,reject){
            var NewConditions = {};
            if(conditions.id){
                NewConditions.id = conditions.id
            }
            if(conditions.id_soal){
                NewConditions.id_soal = conditions.id_soal
            }
            if(conditions.id_tryoutDetail){
                NewConditions.id_tryoutDetail = conditions.id_tryoutDetail
            }
            resolve(NewConditions)
        })
    }

    newTryoutDetailSoals(data,file = "null"){
        let {id_soal,id_tryoutDetail,jawaban_user}= data;
        return new Promise(function(resolve,reject){
          tryoutDS.findOne({
            where:{
              id_tryoutDetail:id_tryoutDetail,
              id_soal: id_soal
            }
          }).then((tods) =>{
            if(tods){
              //Start Update Data
                Soal.findOne({
                    where:{id:id_soal},
                    returning:true
                })
                .then(async (res)=>{
                  let data_matpel = await TOD.findOne({
                    where:{id:id_tryoutDetail},
                    include:[
                      {
                        model: Matpel
                      }
                    ]
                  });
                  let jawaban;
                  let jawaban_benar;
                  let pictureName;

                  if(file){
                      pictureName = file.filename;
                  }else{
                    pictureName = null
                  }

                  if(res.isEssay == 0){
                    Choice.findOne({
                      where: {
                        id_soal : res.id,
                        isTrue: true
                      },
                    }).then((res_soal) =>{
                      if(res_soal.choice == jawaban_user){
                        TOD.findOne({
                          where:{id:id_tryoutDetail}
                        }).then(async(found)=>{
                          found.update({
                            nilai: found.nilai + 1 / data_matpel.matpel.jumlah_soal * 100
                          })
                        });
                        jawaban = true;
                      }else{
                        jawaban = false;
                      }
                      tods.update({
                          id_soal:            id_soal,
                          id_tryoutDetail:    id_tryoutDetail,
                          jawaban_user:       jawaban_user,
                          jawaban_benar:      res_soal.choice,
                          filename:           pictureName ,
                          status:             jawaban
                      })
                      .then(async (result)=>{
                        let response = await tryoutDS.findAll({
                          where : {id:result.id},
                          offset: 0,
                          order: [["id", "ASC"]],
                          include: [
                            {
                              model : Soal,
                              attributes: ["id","soals","pembahasan"]
                            }
                          ]
                        });
                          if(result){
                              resolve({
                                data: response,
                                message: "Update Data Success"
                              });
                          }else{
                              reject("Failed Update Tryout Detail Soals")
                          }
                      })
                      .catch((err)=>{reject(err)})
                    })
                  }else{
                    jawaban_benar = res.jawaban;
                    if(res.jawaban == jawaban_user){
                      TOD.findOne({
                        where:{id:id_tryoutDetail}
                      }).then(async(found)=>{
                        found.update({
                          nilai: 1 / data_matpel.matpel.jumlah_soal * 100
                        })
                      });
                      jawaban = true;
                    }else{
                      jawaban = false;
                    }
                    tods.update({
                        id_soal:            id_soal,
                        id_tryoutDetail:    id_tryoutDetail,
                        jawaban_user:       jawaban_user,
                        jawaban_benar:      jawaban_benar,
                        filename:           pictureName ,
                        status:             jawaban
                    })
                    .then(async(result)=>{
                      let response = await tryoutDS.findOne({
                        where : {id:result.id},
                        offset: 0,
                        order: [["id", "ASC"]],
                        include: [
                          {
                            model : Soal,
                            attributes: ["id","soals","pembahasan"]
                          }
                        ]
                      });
                        if(result){
                            resolve({
                              data:response,
                              message: "Update Data Success"
                            });
                        }else{
                            reject("Failed Update Tryout Detail Soals")
                        }
                    })
                    .catch((err)=>{reject(err)})
                  }
                })
              //End Update Data
            }else{
              //Start Create Data
              Soal.findOne({
                  where:{id:id_soal},
                  returning:true
              })
              .then(async (res)=>{
                let data_matpel = await TOD.findOne({
                  where:{id:id_tryoutDetail},
                  include:[
                    {
                      model: Matpel
                    }
                  ]
                });
                let jawaban;
                let jawaban_benar;
                let pictureName;

                if(file){
                    pictureName = file.filename;
                }else{
                  pictureName = null
                }

                if(res.isEssay == 0){
                  Choice.findOne({
                    where: {
                      id_soal : res.id,
                      isTrue: true
                    },
                  }).then((res_soal) =>{
                    if(res_soal.choice == jawaban_user){
                      TOD.findOne({
                        where:{id:id_tryoutDetail}
                      }).then(async(found)=>{
                        found.update({
                          nilai: found.nilai + 1 / data_matpel.matpel.jumlah_soal * 100
                        })
                      });
                      jawaban = true;
                    }else{
                      jawaban = false;
                    }
                    tryoutDS.create({
                        id_soal:            id_soal,
                        id_tryoutDetail:    id_tryoutDetail,
                        jawaban_user:       jawaban_user,
                        jawaban_benar:      res_soal.choice,
                        filename:           pictureName ,
                        status:             jawaban
                    })
                    .then(async (result)=>{
                      let response = await tryoutDS.findAll({
                        where : {id:result.id},
                        offset: 0,
                        order: [["id", "ASC"]],
                        include: [
                          {
                            model : Soal,
                            attributes: ["id","soals","pembahasan"]
                          }
                        ]
                      });
                        if(result){
                            resolve({
                              data: response,
                              message: "Create Data Success"
                            });
                        }else{
                            reject("Failed Added New Tryout Detail Soals")
                        }
                    })
                    .catch((err)=>{reject(err)})
                  })
                }else{
                  jawaban_benar = res.jawaban;
                  if(res.jawaban == jawaban_user){
                    TOD.findOne({
                      where:{id:id_tryoutDetail}
                    }).then(async(found)=>{
                      found.update({
                        nilai: 1 / data_matpel.matpel.jumlah_soal * 100
                      })
                    });
                    jawaban = true;
                  }else{
                    jawaban = false;
                  }
                  tryoutDS.create({
                      id_soal:            id_soal,
                      id_tryoutDetail:    id_tryoutDetail,
                      jawaban_user:       jawaban_user,
                      jawaban_benar:      jawaban_benar,
                      filename:           pictureName ,
                      status:             jawaban
                  })
                  .then(async(result)=>{
                    let response = await tryoutDS.findOne({
                      where : {id:result.id},
                      offset: 0,
                      order: [["id", "ASC"]],
                      include: [
                        {
                          model : Soal,
                          attributes: ["id","soals","pembahasan"]
                        }
                      ]
                    });
                      if(result){
                          resolve({
                            data:response,
                            message: "Create Data Success"
                          });
                      }else{
                          reject("Failed Added New Tryout Detail Soals")
                      }
                  })
                  .catch((err)=>{reject(err)})
                }
              })
              //Start Create Data
            }
          })
        })
    }

    UpdateTryoutDetailSoals(id,body,file = "null"){
        let {id_soal,id_tryoutDetail,jawaban_user}= body;
        return new Promise(function(resolve,reject){
            tryoutDS.findOne({
                where:{id:id},
                returning:true
            })
            .then((found)=>{
              Soal.findOne({
                  where:{id:found.id_soal},
                  returning:true
              }).then(async (res) => {
                let data_matpel = await TOD.findOne({
                  where:{id:found.id_tryoutDetail},
                  include:[
                    {
                      model: Matpel
                    }
                  ]
                });
                let jawaban;
                let jawaban_benar;
                let pictureName;

                if(file){
                    pictureName = file.filename;
                }else{
                  pictureName = null
                }

                if(res.isEssay == 0){
                  Choice.findOne({
                    where: {
                      id_soal : res.id,
                      isTrue: true
                    },
                  }).then((res_soal) =>{
                    if(res_soal.choice == jawaban_user){
                      TOD.findOne({
                        where:{id:found.id_tryoutDetail}
                      }).then(async(dat)=>{
                        dat.update({
                          nilai: dat.nilai + 1 / data_matpel.matpel.jumlah_soal * 100
                        })
                      });
                      jawaban = true;
                    }else{
                      jawaban = false;
                    }
                    found.update({
                        id_soal:            id_soal,
                        id_tryoutDetail:    id_tryoutDetail,
                        jawaban_user:       jawaban_user,
                        jawaban_benar:      res_soal.choice,
                        filename:           pictureName ,
                        status:             jawaban
                    })
                    .then(async (result)=>{
                      let response = await tryoutDS.findAll({
                        where : {id:result.id},
                        offset: 0,
                        order: [["id", "ASC"]],
                        include: [
                          {
                            model : Soal,
                            attributes: ["id","soals","pembahasan"]
                          }
                        ]
                      });
                        if(result){
                            resolve({
                              data: response,
                              message: "Update Tryout Success"
                            });
                        }else{
                            reject("Failed Update Tryout Detail Soals")
                        }
                    })
                    .catch((err)=>{reject(err)})
                  })
                }else{
                  jawaban_benar = res.jawaban;
                  if(res.jawaban == jawaban_user){
                    TOD.findOne({
                      where:{id:found.id_tryoutDetail}
                    }).then(async(dat)=>{
                      dat.update({
                        nilai: dat.nilai + parseFloat(1 / data_matpel.matpel.jumlah_soal * 100)
                      })
                    });
                    jawaban = true;
                  }else{
                    jawaban = false;
                  }
                  found.update({
                      id_soal:            id_soal,
                      id_tryoutDetail:    id_tryoutDetail,
                      jawaban_user:       jawaban_user,
                      jawaban_benar:      jawaban_benar,
                      filename:           pictureName ,
                      status:             jawaban
                  })
                  .then(async(result)=>{
                    let response = await tryoutDS.findOne({
                      where : {id:result.id},
                      offset: 0,
                      order: [["id", "ASC"]],
                      include: [
                        {
                          model : Soal,
                          attributes: ["id","soals","pembahasan"]
                        }
                      ]
                    });
                      if(result){
                          resolve({
                            data:response,
                            message: "Update Tryout Success"
                          });
                      }else{
                          reject("Failed Update Tryout Detail Soals")
                      }
                  })
                  .catch((err)=>{reject(err)})
                }
              })
            })
        })
    }

    newUpdate(body,file){
      let {id,jawaban_user,stringFile}= body;
      return new Promise(function(resolve,reject){
          tryoutDS.findOne({
              where:{id:id},
              returning:true
          })
          .then((found)=>{
            Soal.findOne({
                where:{id:found.id_soal},
                returning:true
            }).then(async (res) => {
              let data_matpel = await TOD.findOne({
                where:{id:found.id_tryoutDetail},
                include:[
                  {
                    model: Matpel
                  }
                ]
              });
              let jawaban;
              let jawaban_benar;
              let pictureName;

              if(file){
                  pictureName = file.filename;
              }else{
                pictureName = stringFile
              }

              if(res.isEssay == 0){
                Choice.findOne({
                  where: {
                    id_soal : res.id,
                    isTrue: true
                  },
                }).then((res_soal) =>{
                  if(res_soal.choice == jawaban_user){
                    TOD.findOne({
                      where:{id:found.id_tryoutDetail}
                    }).then(async(dat)=>{
                      dat.update({
                        nilai: dat.nilai + 1 / data_matpel.matpel.jumlah_soal * 100
                      })
                    });
                    jawaban = true;
                  }else{
                    jawaban = false;
                  }
                  found.update({
                      jawaban_user:       jawaban_user,
                      filename:           pictureName ,
                      status:             jawaban
                  })
                  .then(async (result)=>{
                    let response = await tryoutDS.findAll({
                      where : {id:result.id},
                      offset: 0,
                      order: [["id", "ASC"]],
                      include: [
                        {
                          model : Soal,
                          attributes: ["id","soals","pembahasan"]
                        }
                      ]
                    });
                      if(result){
                          resolve({
                            data: response,
                            message: "Update Tryout Success"
                          });
                      }else{
                          reject("Failed Update Tryout Detail Soals")
                      }
                  })
                  .catch((err)=>{reject(err)})
                })
              }else if(res.isEssay == 1){
                jawaban_benar = res.jawaban;
                if(res.jawaban == jawaban_user){
                  TOD.findOne({
                    where:{id:found.id_tryoutDetail}
                  }).then(async(dat)=>{
                    dat.update({
                      nilai: dat.nilai + parseFloat(1 / data_matpel.matpel.jumlah_soal * 100)
                    })
                  });
                  jawaban = true;
                }else{
                  jawaban = false;
                }
                found.update({
                    jawaban_user:       jawaban_user,                    
                    filename:           pictureName ,
                    status:             jawaban
                })
                .then(async(result)=>{
                  let response = await tryoutDS.findOne({
                    where : {id:result.id},
                    offset: 0,
                    order: [["id", "ASC"]],
                    include: [
                      {
                        model : Soal,
                        attributes: ["id","soals","pembahasan"]
                      }
                    ]
                  });
                    if(result){
                        resolve({
                          data:response,
                          message: "Update Tryout Success"
                        });
                    }else{
                        reject("Failed Update Tryout Detail Soals")
                    }
                })
                .catch((err)=>{reject(err)})
              }else{
                found.update({
                    jawaban_user:       pictureName,
                    filename:           pictureName,
                    status:             false
                })
                .then(async(result)=>{
                  let response = await tryoutDS.findOne({
                    where : {id:result.id},
                    offset: 0,
                    order: [["id", "ASC"]],
                    include: [
                      {
                        model : Soal,
                        attributes: ["id","soals","pembahasan"]
                      }
                    ]
                  });
                    if(result){
                        resolve({
                          data:response,
                          message: "Update Tryout Success"
                        });
                    }else{
                        reject("Failed Update Tryout Detail Soals")
                    }
                })
                .catch((err)=>{reject(err)})
              }
            })
          })
      })
  }

    delete(id){
        return new Promise(function(resolve,reject){
            tryoutDS.destroy({
                where:{id:id}
            })
            .then((deleted)=>{
                if(deleted){
                    resolve("Success Delete Tryout Detail Soals")
                }else{
                    reject("Failed Delete Tryout Detail Soals")
                }
            })
            .catch((err)=>{
                reject(err)
            })
        })
    }
}


module.exports = Tryoutdetailsoals;
