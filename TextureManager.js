

function TextureManager()
{
	this.LoadedTextures ={};
	
	this.getTexture = function loadTexture(fileName, textureOptions, forceReload)
	
	{ 
		if (this.LoadedTextures[fileName] !== undefined)
		{
			return this.LoadedTextures[fileName];
		}
		
		else
		{
			var texture = gl.createTexture();
			
			texture.options = textureOptions;
			texture.image = new Image();
			texture.image.onload = function()
			{
				handleLoadedTexture(texture)
			}
			
			texture.image.src = fileName;
			
			this.LoadedTextures[fileName] = texture;
			return texture;
		}
	}
	
	function handleLoadedTexture(texture) 
	{
		gl.bindTexture(gl.TEXTURE_2D, texture);
		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.bindTexture(gl.TEXTURE_2D, null);
	}
}