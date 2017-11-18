//生成数组解决方案的脚本
const ToolKit = require("./toolkit");

class Generator{
	generator(){
		while(!this.internalGenerator()){
			//console.warn("try again");
		}
	}

	internalGenerator(){
		this.matrix = ToolKit.matrix.makeMatrix();
		this.orders = ToolKit.matrix.makeMatrix()
							.map(row => row.map((v,i) => i))
							.map(row => ToolKit.matrix.shuffle(row));

		for(let n = 1; n <= 9; n++){
			if(!this.fillNumber(n)){
				return false;
			};
		}
		return true;
	}

	fillNumber(n){
		return this.fillRow(n, 0);
	}

	fillRow(n, rowIndex){
		if(rowIndex > 8){
			return true;
		}

		const row = this.matrix[rowIndex];
		const orders = this.orders[rowIndex];

		for(let i = 0; i < 9; i++){
			const colIndex = orders[i];

			if(row[colIndex]){
				continue;
			}

			if(!ToolKit.matrix.checkFillable(this.matrix, n, rowIndex, colIndex)){
				continue;
			}

			row[colIndex] = n;
			if(!this.fillRow(n, rowIndex + 1)){
				row[colIndex] = 0;
				continue;
			};

			return true;
		}

		return false;
	}
}

module.exports = Generator;