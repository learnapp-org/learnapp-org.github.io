/**
 * Created by lion on 15.09.2016.
 */
gameConfig({
	"ylen" : 6,
	"xlen" : 3,
	"variationRadius" : 65,
	"variationScale" : 1.5,
	"ansArray" : compares,//[ "&lt;", "&lt;", "=", "=", "&gt;", "&gt;" ],
	"befores" : values1,//[ "64 бита", "10 Кбайт", "10 байт", "20 Кбайт", "2 байт",
			//"9 байт" ],
	"afters" : values2,//[ "16 байт", "10600 байт", "80 бит", "20480 байт", "12 бит",
			//"70 бит" ],
	"images" : [ "?", "&lt;", "=", "&gt;" ],
	"style" : "animation: fade 1s linear infinite; padding: 0 20px 0 20px;"
});

function showInfo(){
	$(".modal-info").modal("toggle");
}