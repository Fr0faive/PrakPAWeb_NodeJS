const nama = 'Faikar'
function cetakNama(nama) {
    console.log(`Halo, nama saya ${nama}`);
}

const mahasiswa = {
    nama : 'Asep',
    umur: 20,
    cetakMhs(){
        return `Halo nama saya ${this.nama} dan umur saya ${this.umur}`
    },
};

const PI = 3.14;

class Orang{
    constructor(){
        console.log('Objek orang sudah dibuat');
    }
}


module.exports.cetakNama = cetakNama;
module.exports.PI = PI;
module.exports.mahasiswa = mahasiswa;
module.exports.Orang = Orang;


