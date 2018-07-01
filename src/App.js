import React, { Component } from 'react'
import StudentContract from '../build/contracts/Student.json'
import getWeb3 from './utils/getWeb3'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

const contractAddress = "0x599a0f7d7bbeaa9f06584ca9be5eec59b497d572";
var votingInstance
let _modify=(stus,count,stuname,schname,id)=>{
 console.log(count);
  stus[count].name= stuname;
  stus[count].school= schname;
  stus[count].schoolId= id;
  return stus;
};

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      stus:[
        // {
        //   name : "dd",
        //   id : 0
        // }
      ],
      stuscore:[


      ],
      showlist:[

      ],
      web3: null
    }
  };



  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract')
    const Student = contract(StudentContract)
    Student.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions on SimpleStorage.


    // Get accounts.
    /* eslint-disable */
    this.state.web3.eth.getAccounts((error, accounts) => {
      Student.at(contractAddress).then((instance) => {
        votingInstance = instance
      //   votingInstance.countStudents().then((number)=>{
      //     number=Number(number.c[0]);
      //     for (let i=0;i<number;i++){
      //     //  console.log(number);
      //       votingInstance.findAll(i,
      //         {from:accounts[0]}).then((result)=>{
      //       //    console.log(result);
      //       //    console.log(result[0].c[0]);
      //         //  console.log(result[4]);
      //           console.log(result[5].c[0]);
      //           if(result[5].c[0]==1){
      //          this.setState({
      //           students: this.state.stus.push({
      //             name:result[1],
      //             id:result[0].c[0],
      //             school:result[2],
      //             schoolId:result[3].c[0]
      //           })
      //          });
      //        }
      //       })
      // }
      //   })
        votingInstance.countStudents().then((number)=>{
          number=Number(number.c[0]);
          console.log(number);
          for(let i=0;i<number;i++){
          votingInstance.getStuCountId(i).then((num)=>{
            num=Number(num.c[0]);
            console.log(num);
            for(let j=0;j<num;j++){
              votingInstance.findStudentAll(i,j).then((results)=>{
              console.log(results);
              console.log(results[2].c[0]);
              var id = i*10000+j;
              console.log(id);
              // var n = string(i)+string(j);
              // console.log(n);
              if(results[3].c[0]==1){
              this.setState({
          students: this.state.stuscore.push({
            stuid:i,
            courseid:id,
            name:results[0],
            coursename:results[1],
            score:results[2].c[0]
          })
                });
                }
              })
            }
          })
          }




        })

        return ;
        // Stores a given value, 5 by default.
      //   return simpleStorageInstance.set(5, {from: accounts[0]})
      // }).then((result) => {
      //   // Get the value from the contract to prove it worked.
      //   return simpleStorageInstance.get.call(accounts[0])
      // }).then((result) => {
      //   // Update state with the result.
      //   return this.setState({ storageValue: result.c[0] })
       })
    })
  }

  render() {
    return (
      <div className="App">
      <li>学生信息操作界面</li>
      <li style={{marginLeft:22}}>学生姓名：<input
      ref="stuadd"
      style={{width:200,height:30,boderWith:2,marginLeft:38}}></input></li><li style={{marginLeft:22}}>
      学校：<input
      ref="schoolName"
      style={{width:200,height:30,boderWith:2,marginLeft:70}}></input></li><li style={{marginLeft:22}}>
      学号：<input
      ref="schoolId"
      style={{width:200,height:30,boderWith:2,marginLeft:70}}></input></li>
      <button style={{marginLeft:286}} onClick={()=>{
       let name = this.refs.stuadd.value;
       let schoolName = this.refs.schoolName.value;
       let schoolId =this.refs.schoolId.value;
       votingInstance.addStudent(name,schoolName,schoolId,{from:this.state.web3.eth.coinbase}).then(()=>{
       //var len =this.state.stus.length*10086+schoolId;
       console.log(name);
       votingInstance.countStudents().then((number)=>{
         number=Number(number.c[0])-1;
         //console.log(res[0].c[0]);
         this.setState({
        candid: this.state.stus.push({
          name:name,
          id:number,
          school:schoolName,
          schoolId:schoolId
        }),
        })
       })
      console.log(this.state.stus.length);
      })
      this.refs.stuadd.value="";
      this.refs.schoolName.value="";
      this.refs.schoolId.value="";
    }}>添加学生</button>

    <li style={{marginLeft:22}}>学生systemId：<input
    ref="deleteid"
    style={{width:200,height:30,boderWith:2,marginLeft:0}}
    ></input></li>

    <button style={{marginLeft:286}} onClick={()=>{
      let searchid = this.refs.deleteid.value;
    // console.log(len);
     // console.log(lenstu);
     // console.log(lencourse);
     console.log(searchid);
         votingInstance.deleteStudent(searchid,
           {from:this.state.web3.eth.coinbase}).then(()=>{
         })
      this.refs.deleteid.value="";
    }}>删除学生</button>

    <li style={{marginLeft:22}}>学生systemId：<input
    ref="midifyid"
    style={{width:200,height:30,boderWith:2,marginLeft:3}}
    ></input></li>
    <li style={{marginLeft:22}}>学生姓名：<input
    ref="midifystuadd"
    style={{width:200,height:30,boderWith:2,marginLeft:38}}></input></li><li style={{marginLeft:22}}>
    学校：<input
    ref="midifyschoolName"
    style={{width:200,height:30,boderWith:2,marginLeft:70}}></input></li><li style={{marginLeft:22}}>
    学号：<input
    ref="midifyschoolId"
    style={{width:200,height:30,boderWith:2,marginLeft:70}}></input></li>
    <button style={{marginLeft:256}} onClick={()=>{
    let midifyid = this.refs.midifyid.value;
     let midifyname = this.refs.midifystuadd.value;
     let midifyschoolName = this.refs.midifyschoolName.value;
     let midifyschoolId =this.refs.midifyschoolId.value;
     votingInstance.midifyStu(midifyid,midifyname,midifyschoolName,midifyschoolId,
       {from:this.state.web3.eth.coinbase}).then((result)=>{
    this.setState({
stus:_modify(this.state.stus,midifyid,midifyname,midifyschoolName,midifyschoolId)
//  candid: this.state.candidates[result[0].c[0].id]({name:result[2],count:result[1].c[0],id:result[0].c[0]})
});
     })
     this.refs.midifyid.value="";
     this.refs.midifystuadd.value="";
     this.refs.midifyschoolName.value="";
     this.refs.midifyschoolId.value="";
  }}>修改学生信息</button>
    <hr />
    <li>学生信息</li>
    <button style={{marginLeft:262}} onClick={()=>{
      var len = this.state.stus.length;
      for(let i=0;i<len;i++){
      this.setState({
     students: this.state.stus.pop({
     })
        });
        }
        votingInstance.countStudents().then((number)=>{
          number=Number(number.c[0]);
          for (let i=0;i<number;i++){
          //  console.log(number);
            votingInstance.findAll(i,
              {from:this.state.web3.eth.coinbase}).then((result)=>{
            //    console.log(result);
            //    console.log(result[0].c[0]);
              //  console.log(result[4]);
                console.log(result[5].c[0]);
                if(result[5].c[0]==1){
               this.setState({
                students: this.state.stus.push({
                  name:result[1],
                  id:result[0].c[0],
                  school:result[2],
                  schoolId:result[3].c[0]
                })
               });
             }
            })
      }
        })
    }}>查看学生信息</button>
    <ul>
    {
      this.state.stus.map((person)=>{
        return (
          <li key={person.id}>学生SystemId：{person.id}学生姓名：{person.name} 学校：{person.school}
          学号：{person.schoolId}</li>
        )
      })
    }
    </ul>
    <hr />
      <li>学生成绩操作界面</li>
       <li style={{marginLeft:22}}>学生SystemId:<input
       ref="Inputid"
       style={{width:200,height:25,boderWith:2}}></input>
       </li>
       <li style={{marginLeft:22}}>
       科目名称:<input
       ref="Inputname"
       style={{width:200,height:25,boderWith:2,marginLeft:36}}></input></li>
       <li style={{marginLeft:22}}>
       科目成绩:<input
       ref="Inputnum"
       style={{width:200,height:25,boderWith:2,marginLeft:36}}></input></li>
       <button style={{marginLeft:238}} onClick={()=>{
         let msgid = this.refs.Inputid.value;
         let msgname=this.refs.Inputname.value;
         let msgnum=this.refs.Inputnum.value;
         var stuid=Number(msgid);
         var stuscore=Number(msgnum)
         console.log(stuid);
         console.log(msgname);
         console.log(msgnum);
         votingInstance.addStuScore(stuid,msgname,stuscore,{from:this.state.web3.eth.coinbase}).then(()=>{
           votingInstance.getStuCountId(stuid).then((num)=>{
             var id = stuid*10000+num;
             console.log(id);
             this.setState({
              students: this.state.stuscore.push({
                  stuid:stuid,
                  courseid:id,
                  //name:results[0],
                  coursename:msgname,
                  score:stuscore
                })
              })
             });

         })
         this.refs.Inputid.value="";
         this.refs.Inputname.value="";
         this.refs.Inputnum.value="";
       }}>添加学生成绩</button>

       <li style={{marginLeft:22}}>学生systemId：<input
       ref="deletestuid"
       style={{width:200,height:30,boderWith:2,marginLeft:0}}
       ></input></li>
       <li style={{marginLeft:24}}>课程courseId：<input
       ref="deletecourseid"
       style={{width:200,height:30,boderWith:2,marginLeft:0}}
       ></input></li>
       <button style={{marginLeft:220}} onClick={()=>{
         let deletestuid = this.refs.deletestuid.value;
         let deletecourseid=this.refs.deletecourseid.value;
       // console.log(len);
        // console.log(lenstu);
        // console.log(lencourse);
      //  console.log(searchid);
            votingInstance.deleteStuSorce(deletestuid,deletecourseid,
              {from:this.state.web3.eth.coinbase}).then(()=>{
            })
         this.refs.deletestuid.value="";
         this.refs.deletecourseid.value="";
       }}>删除学生某个成绩</button>
       <ul></ul>
       <hr />
       <input
       ref="searchid"
       style={{width:175,height:25,boderWith:2,marginLeft:30}}></input>
       <button onClick={()=>{
         let searchid = this.refs.searchid.value;

        console.log(searchid);
        console.log(len);
        var len =  this.state.showlist.length;
        for(let i=0;i<len;i++){
        this.setState({
       students: this.state.showlist.pop({
       })
          });
          }
          if (searchid=="") {
            searchid=-1;
          }
          console.log(searchid);
         votingInstance.getStuCountId(searchid).then((num)=>{
           num=Number(num.c[0]);
           console.log(num);
           for(let j=0;j<num;j++){
             votingInstance.findStudentAll(searchid,j).then((results)=>{
             console.log(results);
             console.log(results[2].c[0]);
             var id = searchid*10000+j;
             console.log(id);
             // var n = string(i)+string(j);
             // console.log(n);
             if(results[3].c[0]==1){
               if(results[4].c[0]==1){
             this.setState({
         students: this.state.showlist.push({
           stuid:searchid,
           courseid:id,
           name:results[0],
           coursename:results[1],
           score:results[2].c[0],
           couid:results[5].c[0]
         })
               });
               }
               }
             })
           }
         })
         this.refs.searchid.value="";
       }}>查看某个学生全部成绩</button>
       <ul>
       {

         this.state.showlist.map((person)=>{
           return (
             <li key={person.courseid}>学生SystemId：{person.stuid} 课程courseId：{person.couid} 科目：{person.coursename} 成绩：{person.score}</li>
           )
         })
       }
       </ul>
       <hr />
      </div>
    );
  }
}
export default App
