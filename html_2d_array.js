/*
	constructor
	parametersObj : {
		container_HTML_Node
		//------------------
		callback_function
		//------------------
		values_2d_array // 2d array with values for class object like: [[1,2], [4,5], [7,8]]
		//------------------
		//ignored, if values_2d_array is present
		x_size 
		y_size
		//------------------
		ROW_HTML_TAG_NAME
		CELL_HTML_TAG_NAME
	}
*/
function HTML_2D_ARRAY(parametersObj) {
	this._nodesStoreage = null;
	this._x_size = null;
	this._container = parametersObj.container_HTML_Node;
	this._ROW_TAG_NAME = parametersObj.ROW_HTML_TAG_NAME || 'div';
	this._CELL_TAG_NAME = parametersObj.CELL_HTML_TAG_NAME || 'span';
	this._callback = parametersObj.callback_function;

	if (parametersObj.values_2d_array instanceof Array) {
		this._init_by_array(parametersObj.values_2d_array);
	} else {
		this._init_by_sizes(parametersObj.x_size, parametersObj.y_size);
	}

	this._container.addEventListener('click', this._containerClickHandler.bind(this));
}

/*
	get value of cell
*/
HTML_2D_ARRAY.prototype.get_value = function(x, y) {
	var index = Number(x) * this._x_size + Number(y);
	return this._nodesStoreage[index].innerText;
};

/*
	set value of cell
*/
HTML_2D_ARRAY.prototype.set_value = function(x, y, value_staring) {
	var index = Number(x) * this._x_size + Number(y);
	this._nodesStoreage[index].innerText = value_staring;
};

/*
	call click callback with own params
*/
HTML_2D_ARRAY.prototype._containerClickHandler = function(e) {
	// if it is cell - call callback
	if (this._callback instanceof Function && e.target.dataset.type === 'ARRAY_CELL') {
		var x = e.target.dataset.x,
			y = e.target.dataset.y;
		this._callback.call(e.target, x, y, this.get_value(x, y));
	}
};

HTML_2D_ARRAY.prototype._init_by_sizes = function (x, y) {
	var i, j, innerHtml = '';

	for (i = 0; i < x; ++i) {
		innerHtml += '<' + this._ROW_TAG_NAME + '>';
		for (j = 0; j < y; ++j) {
			innerHtml += 	'<' + this._CELL_TAG_NAME + ' data-x="'+ i +'" data-y="'+ j +'" data-type="ARRAY_CELL">' + 
							'</' + this._CELL_TAG_NAME + '>';
		}
		innerHtml += '</' + this._ROW_TAG_NAME + '>';
	}

	this._container.innerHTML = innerHtml;

	this._x_size = y;
	this._nodesStoreage = this._container.getElementsByTagName(this._CELL_TAG_NAME);
};

HTML_2D_ARRAY.prototype._init_by_array = function (values_2d_array) {
	var i, j, 
		max_i = values_2d_array.length, 
		max_j = values_2d_array[0].length;

	this._init_by_sizes(max_i, max_j);
	for (i = 0; i < max_i; ++i) {
		for (j = 0; j < max_j; j++) {
			this.set_value(i, j, values_2d_array[i][j]);
		}
	}
};