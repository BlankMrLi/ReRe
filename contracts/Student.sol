pragma solidity ^0.4.23;

contract Student {
  struct Course {
    string courseName;
    uint score;
    uint countIdInSystem;
    uint isUse;
    uint courseId;
  }
  struct Students {
    address stuAds;
    string stuName;
    uint countId;
    string stuSchool;
    uint stuSchoolId;
    uint idInSystem;
    uint isUsed;
    mapping (uint => Course) courseCount;
  }
  mapping (uint => Students) stuIds;
  uint stuId=0;

  /* constructor()public {

  } */
  function countStudents()view public returns(uint){
      return stuId;
  }

  function addStudent(string name,string schName,uint schId)public {
    if(stuId==0){
     stuIds[stuId++] =Students(msg.sender,name,0,schName,schId,stuId,1);
    }else{
    require(isExit(schName,schId));
    stuIds[stuId++] =Students(msg.sender,name,0,schName,schId,stuId,1);
    }
  }

    function deleteStudent(uint id)public{
      Students storage stu =stuIds[id];
      require(checkUser(stu.stuAds));
      stu.isUsed = 0;
  }

  function midifyStu(uint id,string stuname,string school,uint identify)public {
    Students storage stu =stuIds[id];
    require(checkUser(stu.stuAds));
    require(isExit(school,identify));
    stuIds[id].stuName=stuname;
    stuIds[id].stuSchool=school;
    stuIds[id].stuSchoolId=identify;

  }
  function findAll(uint id)view public returns(uint,string,string,uint,uint,uint) {
    return (id,stuIds[id].stuName,stuIds[id].stuSchool,stuIds[id].stuSchoolId,stuIds[id].idInSystem,
    stuIds[id].isUsed);
  }


  function getStuCountId(uint stuid)view public returns (uint) {
    return stuIds[stuid].countId;
  }

  function addStuScore(uint studentId,string course,uint num)public {
    Students storage stu =stuIds[studentId];
    require(checkUser(stu.stuAds));
    stu.courseCount[stu.countId++] =Course(course,num,stu.countId,1,stu.countId);

  }

  function deleteStuSorce(uint stuid,uint stucourseid)public{
      Students storage stu =stuIds[stuid];
      require(stu.stuAds == msg.sender);
      stu.courseCount[stucourseid].isUse=0;

  }



  function findStudentAll(uint id,uint couid)view public returns (string,string,uint,uint,uint,uint) {
      Students storage stu =stuIds[id];
      return (stu.stuName,stu.courseCount[couid].courseName,stu.courseCount[couid].score,
      stu.isUsed,stu.courseCount[couid].isUse,stu.courseCount[couid].courseId);
  }

    function checkUser(address ads)view public returns(bool){
        if(msg.sender==ads){
            return true;
        }else{
            return false;
        }
    }

  	function stringsEqual(string  _a, string memory _b)pure public returns (bool) {
		bytes memory a = bytes(_a);
		bytes memory b = bytes(_b);
		if (a.length != b.length)
			return false;
		// @todo unroll this loop
		for (uint i = 0; i < a.length; i ++)
			if (a[i] != b[i])
				return false;
		return true;
	}

	function isExit(string schName,uint schId)view public returns(bool){
	for(uint i=0;i<stuId;i++){
    Students storage stu =stuIds[i];
    if(stringsEqual(stu.stuSchool,schName)&&stu.stuSchoolId==schId){
    return false;
    }
	}
	return true;
	}



}
