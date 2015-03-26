/*
	constructor
	parametersObj : {
		container_HTML_Node
		//------------------
		callback_function
		//------------------
		values_2d_array // 2d array with values for class object like: [[1,2], [4,5], [7,8]]
		//------------------
		//ignored, if values_x_size
y_size2d_array is present
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

	if (parametersObj.values_2d_array instanceof Array) {
		this._init_by_array(parametersObj.values_2d_array);
	} else {
		this._init_by_sizes(parametersObj.x_size, parametersObj.y_size);
	}

	this._container.addEventListener(this._containerClickHandler);
}

/*
	get value of cell
*/
HTML_2D_ARRAY.prototype.get_value = function(x, y) {
	return this._nodesStoreage[x * this._x_size + y].innerText;
};

/*
	set value of cell
*/
HTML_2D_ARRAY.prototype.set_value = function(x, y, value_staring) {
	this._nodesStoreage[x * this._x_size + y].innerText = value_staring;
};

/*
	call click callback with own params
*/
HTML_2D_ARRAY.prototype._containerClickHandler = function(e) {
	// if it is cell - call callback
};

HTML_2D_ARRAY.prototype._init_by_sizes = function (x, y) {
	var i, j, innerHtml = '';

	for (i = 0; i < x; ++i) {
		innerHtml += '<' + this._ROW_TAG_NAME + '>';
		for (j = 0; j < y; ++j) {
			innerHtml += 	'<' + this._CELL_TAG_NAME + ' data-x="'+ i +'" data-y="'+ j +'">' + 
							'</' + this._CELL_TAG_NAME + '>';
		}
		innerHtml += '</' + this._ROW_TAG_NAME + '>';
	}

	this._container.innerHTML = innerHtml;

	this._x_size = x;
	this._nodesStoreage = this._container.getElementsByTagName(this._CELL_TAG_NAME);
};