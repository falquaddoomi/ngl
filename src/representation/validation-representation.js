/**
 * @file Validation Representation
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 * @private
 */


import { RepresentationRegistry } from "../globals.js";
import { defaults } from "../utils.js";
import StructureRepresentation from "./structure-representation.js";
import CylinderBuffer from "../buffer/cylinder-buffer.js";


/**
 * Validation representation
 */
class ValidationRepresentation extends StructureRepresentation{

    get type (){ return "validation"; }

    get parameters (){

        return Object.assign( super.parameters, {
            radiusType: null,
            radius: null,
            scale: null
        } );

    }

    init( params ){

        const p = params || {};
        p.colorValue = defaults( p.colorValue, "#f0027f" );

        super.init( p );

    }

    createData( sview ){

        if( !sview.validation ) return;

        const clashData = sview.validation.getClashData( {
            structure: sview,
            color: this.colorValue
        } );

        const cylinderBuffer = new CylinderBuffer(
            clashData, this.getBufferParams( { openEnded: false } )
        );

        return {
            bufferList: [ cylinderBuffer ]
        };

    }

}


RepresentationRegistry.add( "validation", ValidationRepresentation );


export default ValidationRepresentation;
