import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adapter, FEATURE_NAME, TimeReportState } from './time-report.reducer';
import { TimeReportStats } from '@elektro-braun/time-tracking/domain';
import { DateService } from '@elektro-braun/shared/util-date';

const featureSelector = createFeatureSelector<TimeReportState>(FEATURE_NAME);

const { selectAll, selectIds, selectTotal, selectEntities } = adapter.getSelectors<TimeReportState>(featureSelector);

const selectLoading = createSelector(
  featureSelector,
  state => state.loading || state.status === 'LOADING'
)

const selectTotalHours = createSelector(
  selectAll,
  (reports) => reports.map(o => o.totalHours).reduce((total, hours) => total + hours, 0)
)

const selectRegularHours = createSelector(
  selectAll,
  (reports) => reports.map(o => o.regularHours).reduce((total, hours) => total + hours, 0)
)

const selectOvertime = createSelector(
  selectAll,
  (reports) => reports.map(o => o.bonusTime).reduce((total, hours) => total + hours, 0)
)

const selectSickLeave = createSelector(
  selectAll,
  (reports) => reports.map(o => o.sickLeave).reduce((total, hours) => total + hours, 0)
)

const selectHoliday = createSelector(
  selectAll,
  (reports) => reports.map(o => o.holiday).reduce((total, hours) => total + hours, 0)
)

const selectLessTime = createSelector(
  selectAll,
  (reports) => reports.map(o => o.lessTime).reduce((total, hours) => total + hours, 0)
)

const selectRange = createSelector(
  featureSelector,
  state => ({ from: state?.from ?? DateService.getFirstISODateOfYear(), to: state?.to ?? DateService.getCurrentISODate() })
)

const selectReportStats = createSelector(
  selectRange,
  selectTotalHours,
  selectRegularHours,
  selectOvertime,
  selectLessTime,
  selectHoliday,
  selectSickLeave,
  (range, total, regular, overtime, lessTime, holiday, sickLeave): TimeReportStats => ({
    range,
    total,
    regular,
    overtime,
    lessTime,
    holiday,
    sickLeave,
    balance: (total - regular) ?? 0
  })
)

export const selectors = {
  selectAll,
  selectIds,
  selectTotal,
  selectEntities,
  selectLoading,
  selectReportStats
}
