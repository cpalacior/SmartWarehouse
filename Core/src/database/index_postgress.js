const {Admin, AdminSchema} = require('../models/models_core/Admin');
const {Batch, BatchSchema} = require('../models/models_core/Batch');
const {Section, SectionSchema} = require('../models/models_core/Section');
const {Warehouse, WarehouseSchema} = require('../models/models_core/Warehouse');
const {Level, LevelSchema} = require('../models/models_core/Level');
const {Package, PackageSchema} = require('../models/models_core/Package');
const {Slot, SlotSchema} = require('../models/models_core/Slot');
const {Notification, NotifSchema} = require('../models/models_core/Notifications')

function setupModels(sequelize){
    Admin.init(AdminSchema, Admin.config(sequelize)); //Inicializacion de la tabla Admin
    Batch.init(BatchSchema, Batch.config(sequelize)); //Inicializacion de la tabla Batch
    Section.init(SectionSchema, Section.config(sequelize)); //Inicializacion de la tabla Section
    Warehouse.init(WarehouseSchema, Warehouse.config(sequelize)); //Inicializacion de la tabla Warehouse
    Level.init(LevelSchema, Level.config(sequelize)); //Inicializacion de la tabla Level
    Package.init(PackageSchema, Package.config(sequelize)); //Inicializacion de la tabla Package
    Slot.init(SlotSchema, Slot.config(sequelize)); //Inicializacion de la tabla Slot
    Notification.init(NotifSchema, Notification.config(sequelize))

    //conexion con la clave foranea entre Warehouse y Section
    Warehouse.hasMany(Section,{onDelete:'cascade',hooks:true});
    Section.belongsTo(Warehouse);

    //conexión con la clave foranea entre Section y Slot
    Section.hasMany(Slot,{onDelete:'cascade',hooks:true});
    Slot.belongsTo(Section);

    //conexión con la clave foranea entre Slot y Level
    Slot.hasMany(Level,{onDelete:'cascade',hooks:true});
    Level.belongsTo(Slot);
    
    //Llave foranea entre Batch y Package
    Batch.hasMany(Package,{onDelete:'cascade',hooks:true});
    Package.belongsTo(Batch);

    //Relacion uno a uno administrador-bodega
    Warehouse.hasOne(Admin,{onDelete:'cascade',hooks:true});
    Admin.belongsTo(Warehouse);

    Admin.hasMany(Section,{onDelete:'cascade',hooks:true});
    Section.belongsTo(Admin);

    Admin.hasMany(Batch,{onDelete:'cascade',hooks:true});
    Batch.belongsTo(Admin);

    Admin.hasMany(Notification,{onDelete:'cascade',hooks:true});
    Notification.belongsTo(Admin);

    Package.hasMany(Notification,{onDelete:'cascade',hooks:true});
    Notification.belongsTo(Package);

}

module.exports = setupModels;