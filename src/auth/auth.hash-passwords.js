"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt = require("bcrypt");
var fs_1 = require("fs");
var zaposleni = [
    { email: 'marko.markovic@vinarija.rs', password: 'marko' },
    { email: 'petar.petrovic@vinarija.rs', password: 'petar' },
    { email: 'pavle.pavlovic@vinarija.rs', password: 'pavle' },
    { email: 'marija.marijanovic@vinarija.rs,', password: 'marija' },
    { email: 'mihajlo.mihajlovic@vinarija.rs', password: 'mihajlo' },
    { email: 'mina.minic@vinarija.rs', password: 'mina' }
];
function hashPasswords() {
    return __awaiter(this, void 0, void 0, function () {
        var saltRounds, hashedUsers, _i, zaposleni_1, zaposlen, hashedPassword;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    saltRounds = 10;
                    hashedUsers = [];
                    _i = 0, zaposleni_1 = zaposleni;
                    _a.label = 1;
                case 1:
                    if (!(_i < zaposleni_1.length)) return [3 /*break*/, 4];
                    zaposlen = zaposleni_1[_i];
                    return [4 /*yield*/, bcrypt.hash(zaposlen.password, saltRounds)];
                case 2:
                    hashedPassword = _a.sent();
                    hashedUsers.push({ email: zaposlen.email, hashedPassword: hashedPassword });
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    generateSQL(hashedUsers);
                    return [2 /*return*/];
            }
        });
    });
}
function generateSQL(hashedUsers) {
    var sql = '';
    sql += "INSERT INTO zaposleni (imePrezime, mejl, password, brojTelefona,rolaIDRole) VALUES ('Marko Markovic','".concat(hashedUsers[0].email, "', '").concat(hashedUsers[0].hashedPassword, "', '+381641234567',1);\n");
    sql += "INSERT INTO zaposleni (imePrezime, mejl, password, brojTelefona,rolaIDRole) VALUES ('Petar Petrovic','".concat(hashedUsers[1].email, "', '").concat(hashedUsers[1].hashedPassword, "', '+381641234568',1);\n");
    sql += "INSERT INTO zaposleni (imePrezime, mejl, password, brojTelefona,rolaIDRole) VALUES ('Pavle Pavlovic','".concat(hashedUsers[2].email, "', '").concat(hashedUsers[2].hashedPassword, "', '+381641234569',2);\n");
    sql += "INSERT INTO zaposleni (imePrezime, mejl, password, brojTelefona,rolaIDRole) VALUES ('Marija Marijanovic','".concat(hashedUsers[3].email, "', '").concat(hashedUsers[3].hashedPassword, "', '+381641234570',3);\n");
    sql += "INSERT INTO zaposleni (imePrezime, mejl, password, brojTelefona,rolaIDRole) VALUES ('Mihajlo Mihajlovic','".concat(hashedUsers[4].email, "', '").concat(hashedUsers[4].hashedPassword, "', '+381641234571',3);\n");
    sql += "INSERT INTO zaposleni (imePrezime, mejl, password, brojTelefona.rolaIDRole) VALUES ('Mina Minic','".concat(hashedUsers[5].email, "', '").concat(hashedUsers[5].hashedPassword, "', '+381641234523',1);\n");
    (0, fs_1.writeFileSync)('insert_users.sql', sql);
    console.log('SQL upit je generisan i sačuvan u fajlu insert_users.sql.');
}
hashPasswords().catch(function (error) { return console.error(error); });
