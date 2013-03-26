function ShaderManager()
{
	this.CompiledShader	= {};
	
	this.Activeshader = null;
	
	this.getShaderKey = function getShaderKey(vertexShaderId, fragmentShaderId)
	{
		return vertexShaderId + fragmentShaderId;
	}
	
	this.getShader = function getShader(vertexShaderId, fragmentShaderId)
	{
		var shaderKey = this.getShaderKey(vertexShaderId, fragmentShaderId);

		if (this.CompiledShader[shaderKey] !== undefined)
		{
			return this.CompiledShader[shaderKey]; 
		}
		
		else
		{
			var compiledShader = compileShaders (vertexShaderId, fragmentShaderId);
			this.CompiledShader[shaderKey] = compiledShader;
			
			return compiledShader;
		}
	}
	
	this.activateShader = function activateShader(shader)
    {
        
        if (this.ActiveShader !== shader && this.ActiveShader !== null)
        {
            this.deactivateShader(this.ActiveShader);
        }

        this.ActiveShader = shader;
        gl.useProgram(shader)

        if (shader.vertexPositionAttribute >= 0)
        {
            gl.enableVertexAttribArray(shader.vertexPositionAttribute);
        }

        if (shader.vertexColorAttribute >= 0)
        {
            gl.enableVertexAttribArray(shader.vertexColorAttribute);
        }

        if (shader.vertexTexCoordAttribute >= 0)
        {
            gl.enableVertexAttribArray(shader.vertexTexCoordAttribute);
        }
		
		 if (shader.vertexNormalAttribute >= 0)
        {
            gl.enableVertexAttribArray(shader.vertexNormalAttribute);
        }
		

        this.ActiveShader = null;
    }


    this.deactivateShader = function deactivateShader(shader)
    {
       
        if (this.ActiveShader !== shader)
        {
            console.log("Failed to deactivate shader as it was not active.")
            return;
        }

        if (shader.vertexPositionAttribute >= 0)
        {
            gl.disableVertexAttribArray(shader.vertexPositionAttribute);
        }

        if (shader.vertexColorAttribute >= 0)
        {
            gl.disableVertexAttribArray(shader.vertexColorAttribute);
        }

        if (shader.vertexTexCoordAttribute >= 0)
        {
            gl.disableVertexAttribArray(shader.vertexTexCoordAttribute);
        }
		
		if (shader.vertexNormalAttribute >= 0)
        {
            gl.disableVertexAttribArray(shader.vertexNormalAttribute);
        }

        this.ActiveShader = null;
        gl.useProgram(null)
    }
	
}