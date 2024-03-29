"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TuitDao_1 = __importDefault(require("../daos/TuitDao"));
/**
 * @class TuitController Implements RESTful Web service API for tuits resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /tuits to retrieve all the tuit instances</li>
 *     <li>GET /tuits/:tid to retrieve a particular tuit instances</li>
 *     <li>GET /users/:uid/tuits to retrieve tuits for a given user </li>
 *     <li>POST /users/:uid/tuits to create a new tuit instance for a given user</li>
 *     <li>PUT /tuits/:tid to modify an individual tuit instance </li>
 *     <li>DELETE /tuits/:tid to remove a particular tuit instance</li>
 * </ul>
 * @property {TuitDao} tuitDao Singleton DAO implementing tuit CRUD operations
 * @property {TuitController} tuitController Singleton controller implementing
 * RESTful Web service API
 */
class TuitController {
    constructor() {
        this.tuitDao = TuitDao_1.default.getInstance();
        /**
         * Retrieves all tuits from the database and returns an array of tuits.
         * @param {Request} req Represents request from client
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the tuit objects
         */
        this.findAllTuits = (req, res) => this.tuitDao.findAllTuits()
            .then(tuits => res.json(tuits));
        /**
         * Retrieves all tuits from the database for a particular user and returns
         * an array of tuits.
         * @param {Request} req Represents request from client
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the tuit objects
         */
        this.findTuitsByUser = (req, res) => this.tuitDao.findTuitsByUser(req.params.uid)
            .then(tuits => res.json(tuits));
        /**
         * @param {Request} req Represents request from client, including path
         * parameter tid identifying the primary key of the tuit to be retrieved
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON containing the tuit that matches the tid
         */
        this.findTuitById = (req, res) => this.tuitDao.findTuitById(req.params.tid)
            .then(tuit => res.json(tuit));
        /**
         * @param {Request} req Represents request from client, including body
         * containing the JSON object for the new tuit to be inserted in the
         * database
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON containing the new tuit that was inserted in the
         * database
         */
        this.createTuitByUser = (req, res) => this.tuitDao.createTuitByUser(req.params.uid, req.body)
            .then(tuit => res.json(tuit));
        /**
         * @param {Request} req Represents request from client, including path
         * parameter tid identifying the primary key of the tuit to be modified
         * @param {Response} res Represents response to client, including status
         * on whether updating a tuit was successful or not
         */
        this.updateTuit = (req, res) => this.tuitDao.updateTuit(req.params.tid, req.body)
            .then(status => res.json(status));
        /**
         * @param {Request} req Represents request from client, including path
         * parameter tid identifying the primary key of the tuit to be removed
         * @param {Response} res Represents response to client, including status
         * on whether deleting a tuit was successful or not
         */
        this.deleteTuit = (req, res) => this.tuitDao.deleteTuit(req.params.tid)
            .then(status => res.json(status));
    }
}
exports.default = TuitController;
TuitController.tuitController = null;
/**
 * Creates singleton controller instance
 * @param {Express} app Express instance to declare the RESTful Web service API
 * @return tuitController
 */
TuitController.getInstance = (app) => {
    if (TuitController.tuitController === null) {
        TuitController.tuitController = new TuitController();
        //define HTTP request address
        app.get("/tuits", TuitController.tuitController.findAllTuits);
        app.get("/tuits/:tid", TuitController.tuitController.findTuitById);
        app.get("/users/:uid/tuits", TuitController.tuitController.findTuitsByUser);
        app.post("/users/:uid/tuits", TuitController.tuitController.createTuitByUser);
        app.put("/tuits/:tid", TuitController.tuitController.updateTuit);
        app.delete("/tuits/:tid", TuitController.tuitController.deleteTuit);
    }
    return TuitController.tuitController;
};
