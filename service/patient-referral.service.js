<<<<<<< Updated upstream
import { PatientlistMysqlReport } from "../app/reporting-framework/patientlist-mysql.report";
import { PatientReferralAggregateService } from "./patient-referral-aggregate.service";
import { titleCase } from "../etl-helpers";

const dao = require("../etl-dao");
const Promise = require("bluebird");

export class PatientReferralService {
  getAggregateReport(reportParams) {
    reportParams.locationUuids = reportParams.locationUuids
      ? reportParams.locationUuids.replace(/,/g, "', '")
      : null;
    reportParams.programUuids = reportParams.programUuids
      ? reportParams.programUuids.replace(/,/g, "', '")
      : null;
    reportParams.notificationStatus = reportParams.notificationStatus
      ? null
      : "null";
    return new Promise(function (resolve, reject) {
      reportParams.groupBy = "groupByLocation,groupByProgram";
      reportParams.countBy = "num_persons";
      let report = new PatientReferralAggregateService(
        "referralAggregate",
        reportParams
      );
      Promise.join(report.generateReport(reportParams), (results) => {
=======
const dao = require('../etl-dao');
const Promise = require('bluebird');
const Moment = require('moment');
const _ = require('lodash');
import { BaseMysqlReport } from '../app/reporting-framework/base-mysql.report';
import { PatientlistMysqlReport } from '../app/reporting-framework/patientlist-mysql.report';
import { PatientReferralAggregateService } from './patient-referral-aggregate.service';
export class PatientReferralService {
  getAggregateReport(reportParams) {
    reportParams.locationUuids = reportParams.locationUuids
      ? reportParams.locationUuids.replace(/,/g, "','")
      : null;
    reportParams.programUuids = reportParams.programUuids
      ? reportParams.programUuids.replace(/,/g, "','")
      : null;
    // notificationStatus param can either be ALL or null
    // notificationStatus param with ALL is used to get all patients irrespective of notification status
    // if notificationStatus is not provided : only  patients notification with null notification status are included
    reportParams.notificationStatus = reportParams.notificationStatus
      ? null
      : 'null';
    let self = this;
    return new Promise(function (resolve, reject) {
      reportParams.groupBy = 'groupByLocation,groupByProgram';
      reportParams.countBy = 'num_persons';
      let report = new PatientReferralAggregateService(
        'referralAggregate',
        reportParams
      );
      Promise.join(report.generateReport(reportParams), (results) => {
        // TODO Do some post processing
>>>>>>> Stashed changes
        results = results.results;
        resolve(results);
      }).catch((errors) => {
        reject(errors);
      });
    });
  }

  getPatientListReport(reportParams) {
<<<<<<< Updated upstream
    return new Promise(function (resolve, reject) {
      reportParams.groupBy = "groupByPerson";
=======
    let self = this;
    return new Promise(function (resolve, reject) {
      reportParams.groupBy = 'groupByPerson';
      //TODO: Do some pre processing
>>>>>>> Stashed changes
      Promise.join(dao.runReport(reportParams), (results) => {
        resolve(results);
      }).catch((errors) => {
        reject(errors);
      });
    });
  }

<<<<<<< Updated upstream
  getReferralPatientListReport(reportParams) {
    return new Promise(function (resolve, reject) {
      reportParams.groupBy = "groupByPerson";
      reportParams.notificationStatus = reportParams.notificationStatus
        ? null
        : "null";
      let reportName = reportParams.reportName;
      let report = new PatientlistMysqlReport(reportName, reportParams);

      Promise.join(report.generatePatientListReport([]), (data) => {
        const { results } = data.results;
        for (let key in results) {
          if (results.hasOwnProperty(key)) {
            if (results[key].person_name) {
              results[key].person_name = titleCase(results[key].person_name);
            }
          }
        }
        let reportData = {};
        reportData.result = results.sort((a, b) =>
          b.date_referred > a.date_referred ? 1 : -1
        );
        resolve(reportData);
=======
  getPatientListReport2(reportParams) {
    // let self = this;
    return new Promise(function (resolve, reject) {
      reportParams.groupBy = 'groupByPerson';
      reportParams.notificationStatus = reportParams.notificationStatus
        ? null
        : 'null';
      let report = new PatientlistMysqlReport(
        'referralAggregate',
        reportParams
      );
      Promise.join(report.generatePatientListReport([]), (results) => {
        // results.result = results.results.results;
        let data = results;
        data.result = results.results.results;
        // let data = results.results.results;
        resolve(data);
>>>>>>> Stashed changes
      }).catch((errors) => {
        reject(errors);
      });
    });
  }
<<<<<<< Updated upstream

  getPeerNavigatorReferralPatientList(reportParams) {
    return new Promise(function (resolve, reject) {
      reportParams.groupBy = "groupByPerson";
      reportParams.notificationStatus = reportParams.notificationStatus
        ? null
        : "null";
      let report = new PatientlistMysqlReport(
        "referral-patient-peer-navigator-list",
        reportParams
      );
      Promise.join(report.generatePatientListReport([]), (results) => {
        let data = results;
        data.result = results.results.results;
=======
  getPatientListReport3(reportParams) {
    // let self = this;
    return new Promise(function (resolve, reject) {
      reportParams.groupBy = 'groupByPerson';
      reportParams.notificationStatus = reportParams.notificationStatus
        ? null
        : 'null';
      let report = new PatientlistMysqlReport(
        'referral-patient-peer-navigator-list',
        reportParams
      );
      Promise.join(report.generatePatientListReport([]), (results) => {
        // results.result = results.results.results;
        let data = results;
        data.result = results.results.results;
        // let data = results.results.results;
>>>>>>> Stashed changes
        resolve(data);
      }).catch((errors) => {
        reject(errors);
      });
    });
  }
}
