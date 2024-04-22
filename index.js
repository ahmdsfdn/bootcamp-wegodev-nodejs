const nilai = 20;

function penilaianProjek(value){
   return new Promise(function(resolve, reject){
      const batasNilai = 75;

      if(value > 75){
         setTimeout(function () {
            resolve("Menang project");
          }, 3000);
      } else {
         setTimeout(function () {
            reject(
              new Error("Project belum berhasil di dapatkan")
            );
          }, 3000);
      }
   })
}

// Promise
penilaianProjek(nilai).then((data)=>{
   console.log(data);
}).catch((error)=>{
   console.log(error.message);
})

// Async Await
async function callFunc(nilai){
   try {
      const data = await penilaianProjek(nilai);
      console.log(data);
   } catch (error){
      console.log(error.message)
   }
}

callFunc(nilai);