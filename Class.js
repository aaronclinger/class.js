/**
 * @author Aaron Clinger - https://github.com/aaronclinger/class.js
 */
(function(scope) {
	var classInit = false;
	
	function namespace(space) {
		if ( ! space) {
			return scope;
		}
		
		var parent = scope,
		    parts  = space.split('.'),
		    length = parts.length,
		    i      = -1,
		    part;
		
		
		while (++i < length) {
			part   = parts[i];
			parent = parent[part] = parent[part] || {};
		}
		
		return parent;
	}
	
	scope.createClass = function(options) {
		if (typeof options === 'function') {
			options = {define: options};
		}
		
		var Define = options.define,
		    Extend = options.extend || null,
		    type   = options.type || '',
		    name   = options.name || Define.toString().match(/function ([^(]+)/)[1],
		    space  = namespace(options.namespace);
		
		
		var Child = function() {
			var child  = (typeof Define === 'function') ? new Define() : Define,
			    isInit = classInit,
			    override,
			    parent,
			    i;
			
			
			if (Extend) {
				classInit = true;
				parent    = new Extend();
				classInit = isInit;
				
				override = function(child, parent) {
					return function() {
						this.parent = parent;
						
						return child.apply(this, arguments);
					};
				};
				
				for (i in parent) {
					if (typeof parent[i] === 'function') {
						if (child[i]) {
							child[i] = override(child[i], parent[i]);
						} else {
							child[i] = parent[i];
						}
					}
				}
			}
			
			if ( ! classInit && child.init) {
				child.init.apply(child, arguments);
			}
			
			return child;
		};
		
		switch (type.toLowerCase()) {
			case 'static' :
				space[name] = new Child();
				break;
			default :
				space[name] = Child;
				break;
		}
	};
}(window));