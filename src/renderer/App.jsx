import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import React, { useState, useMemo } from 'react';
import Datepicker from 'react-tailwindcss-datepicker';

import {
  Column,
  Table,
  useReactTable,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  sortingFns,
  getSortedRowModel,
  FilterFn,
  SortingFn,
  ColumnDef,
  flexRender,
  FilterFns,
  createColumnHelper,
  getExpandedRowModel,
} from '@tanstack/react-table';

import {
  RankingInfo,
  rankItem,
  compareItems,
} from '@tanstack/match-sorter-utils';

const stats = JSON.parse(`
{
  "ussper": {
    "RbpUssPerAttachedObjectDetection": {
      "findings": [],
      "previously_found_findings": [],
      "fuzzer_stats": [
        {
          "epoch_timestamp": 1692475569,
          "timestamp": "19.08.2023 22:06:09",
          "runtime_seconds": 3601,
          "runtime": "1:00:01",
          "branch": "HEAD",
          "commit": "e9a46411",
          "commit_timestamp": "'2023-08-18 12:25:49'",
          "inputs_tested": 68011282,
          "average_inputs_tested_per_second": 18886,
          "new_crashes_count": 0,
          "known_crashes_count": 0,
          "blacklisted_crashes_count": 0,
          "unreproducible_crashes_count": 0,
          "total_crashes_count": 0,
          "timeouts_count": 0,
          "artifactory_folder": "2023_08_19_22_06_09"
        }
      ]
    },
    "RbpUssPerFog": {
      "findings": [],
      "previously_found_findings": [],
      "fuzzer_stats": [
        {
          "epoch_timestamp": 1692475569,
          "timestamp": "19.08.2023 22:06:09",
          "runtime_seconds": 3601,
          "runtime": "1:00:01",
          "branch": "HEAD",
          "commit": "e9a46411",
          "commit_timestamp": "'2023-08-18 12:25:49'",
          "inputs_tested": 9114574,
          "average_inputs_tested_per_second": 2531,
          "new_crashes_count": 0,
          "known_crashes_count": 0,
          "blacklisted_crashes_count": 0,
          "unreproducible_crashes_count": 0,
          "total_crashes_count": 0,
          "timeouts_count": 0,
          "artifactory_folder": "2023_08_19_22_06_09"
        }
      ]
    },
    "RbpUssPerFreeSpaceDetection": {
      "findings": [],
      "previously_found_findings": [
        {
          "epoch_timestamp": 1692475569,
          "timestamp": "19.08.2023 22:06:09",
          "branch": "HEAD",
          "commit": "e9a46411",
          "commit_timestamp": "'2023-08-18 12:25:49'",
          "bug_type": "Null Pointer",
          "error_message": "Unknown",
          "artifactory_folder": "2023_08_05_22_05_54/findings/crashes/0"
        },
        {
          "epoch_timestamp": 1692475569,
          "timestamp": "19.08.2023 22:06:09",
          "branch": "HEAD",
          "commit": "e9a46411",
          "commit_timestamp": "'2023-08-18 12:25:49'",
          "bug_type": "Null Pointer",
          "error_message": "Duplicate - Unknown",
          "artifactory_folder": "2023_08_05_22_05_54/findings/crashes/0"
        },
        {
          "epoch_timestamp": 1692475569,
          "timestamp": "19.08.2023 22:06:09",
          "branch": "HEAD",
          "commit": "e9a46411",
          "commit_timestamp": "'2023-08-18 12:25:49'",
          "bug_type": "Buffer Overflow",
          "error_message": "stack-buffer-overflow on address 0x7f18377d029c at pc 0x00000053f012 bp 0x7ffe1bb299b0 sp 0x7ffe1bb299a0",
          "artifactory_folder": "2023_07_24_14_23_46/findings/crashes/1"
        }
      ],
      "fuzzer_stats": [
        {
          "epoch_timestamp": 1692475569,
          "timestamp": "19.08.2023 22:06:09",
          "runtime_seconds": 3601,
          "runtime": "1:00:01",
          "branch": "HEAD",
          "commit": "e9a46411",
          "commit_timestamp": "'2023-08-18 12:25:49'",
          "inputs_tested": 1160222,
          "average_inputs_tested_per_second": 322,
          "new_crashes_count": 0,
          "known_crashes_count": 2,
          "blacklisted_crashes_count": 0,
          "unreproducible_crashes_count": 21,
          "total_crashes_count": 189920,
          "timeouts_count": 0,
          "artifactory_folder": "2023_08_19_22_06_09"
        }
      ]
    },
    "RbpUssPerPerfHealthOutputGen": {
      "findings": [],
      "previously_found_findings": [],
      "fuzzer_stats": [
        {
          "epoch_timestamp": 1692475569,
          "timestamp": "19.08.2023 22:06:09",
          "runtime_seconds": 3601,
          "runtime": "1:00:01",
          "branch": "HEAD",
          "commit": "e9a46411",
          "commit_timestamp": "'2023-08-18 12:25:49'",
          "inputs_tested": 87217693,
          "average_inputs_tested_per_second": 24220,
          "new_crashes_count": 0,
          "known_crashes_count": 0,
          "blacklisted_crashes_count": 0,
          "unreproducible_crashes_count": 0,
          "total_crashes_count": 0,
          "timeouts_count": 0,
          "artifactory_folder": "2023_08_19_22_06_09"
        }
      ]
    },
    "RbpUssPerSeg": {
      "findings": [
        {
          "epoch_timestamp": 1692475569,
          "timestamp": "19.08.2023 22:06:09",
          "branch": "HEAD",
          "commit": "e9a46411",
          "commit_timestamp": "'2023-08-18 12:25:49'",
          "bug_type": "Null Pointer",
          "error_message": "Unknown",
          "artifactory_folder": "2023_08_19_22_06_09/findings/crashes/10"
        },
        {
          "epoch_timestamp": 1692475569,
          "timestamp": "19.08.2023 22:06:09",
          "branch": "HEAD",
          "commit": "e9a46411",
          "commit_timestamp": "'2023-08-18 12:25:49'",
          "bug_type": "Null Pointer",
          "error_message": "Unknown",
          "artifactory_folder": "2023_08_19_22_06_09/findings/crashes/9"
        },
        {
          "epoch_timestamp": 1692475569,
          "timestamp": "19.08.2023 22:06:09",
          "branch": "HEAD",
          "commit": "e9a46411",
          "commit_timestamp": "'2023-08-18 12:25:49'",
          "bug_type": "Null Pointer",
          "error_message": "Unknown",
          "artifactory_folder": "2023_08_19_22_06_09/findings/crashes/8"
        },
        {
          "epoch_timestamp": 1692475569,
          "timestamp": "19.08.2023 22:06:09",
          "branch": "HEAD",
          "commit": "e9a46411",
          "commit_timestamp": "'2023-08-18 12:25:49'",
          "bug_type": "Null Pointer",
          "error_message": "Unknown",
          "artifactory_folder": "2023_08_19_22_06_09/findings/crashes/7"
        },
        {
          "epoch_timestamp": 1692475569,
          "timestamp": "19.08.2023 22:06:09",
          "branch": "HEAD",
          "commit": "e9a46411",
          "commit_timestamp": "'2023-08-18 12:25:49'",
          "bug_type": "Assertion Failed",
          "error_message": "Assertion failed: f_timeOld.value() >= 0",
          "artifactory_folder": "2023_08_19_22_06_09/findings/crashes/6"
        },
        {
          "epoch_timestamp": 1692475569,
          "timestamp": "19.08.2023 22:06:09",
          "branch": "HEAD",
          "commit": "e9a46411",
          "commit_timestamp": "'2023-08-18 12:25:49'",
          "bug_type": "Assertion Failed",
          "error_message": "Assertion failed: f_timeNew.value() >= 0",
          "artifactory_folder": "2023_08_19_22_06_09/findings/crashes/5"
        },
        {
          "epoch_timestamp": 1692475569,
          "timestamp": "19.08.2023 22:06:09",
          "branch": "HEAD",
          "commit": "e9a46411",
          "commit_timestamp": "'2023-08-18 12:25:49'",
          "bug_type": "Null Pointer",
          "error_message": "Unknown",
          "artifactory_folder": "2023_08_19_22_06_09/findings/crashes/4"
        },
        {
          "epoch_timestamp": 1692475569,
          "timestamp": "19.08.2023 22:06:09",
          "branch": "HEAD",
          "commit": "e9a46411",
          "commit_timestamp": "'2023-08-18 12:25:49'",
          "bug_type": "Buffer Overflow",
          "error_message": "stack-buffer-overflow on address 0x7ffe4ca485cc at pc 0x00000056e7d1 bp 0x7ffe4ca40100 sp 0x7ffe4ca400f0",
          "artifactory_folder": "2023_08_19_22_06_09/findings/crashes/3"
        },
        {
          "epoch_timestamp": 1692475569,
          "timestamp": "19.08.2023 22:06:09",
          "branch": "HEAD",
          "commit": "e9a46411",
          "commit_timestamp": "'2023-08-18 12:25:49'",
          "bug_type": "Assertion Failed",
          "error_message": "Assertion failed: true == capacity_check(m_usedElements+1)",
          "artifactory_folder": "2023_08_19_22_06_09/findings/crashes/2"
        },
        {
          "epoch_timestamp": 1692475569,
          "timestamp": "19.08.2023 22:06:09",
          "branch": "HEAD",
          "commit": "e9a46411",
          "commit_timestamp": "'2023-08-18 12:25:49'",
          "bug_type": "Assertion Failed",
          "error_message": "Assertion failed: l_detectionData.m_detectionList.size() < l_detectionData.m_detectionList.MaxSize",
          "artifactory_folder": "2023_08_19_22_06_09/findings/crashes/1"
        },
        {
          "epoch_timestamp": 1692475569,
          "timestamp": "19.08.2023 22:06:09",
          "branch": "HEAD",
          "commit": "e9a46411",
          "commit_timestamp": "'2023-08-18 12:25:49'",
          "bug_type": "Null Pointer",
          "error_message": "Unknown",
          "artifactory_folder": "2023_08_19_22_06_09/findings/crashes/0"
        }
      ],
      "previously_found_findings": [
        {
          "epoch_timestamp": 1692475569,
          "timestamp": "19.08.2023 22:06:09",
          "branch": "HEAD",
          "commit": "e9a46411",
          "commit_timestamp": "'2023-08-18 12:25:49'",
          "bug_type": "Assertion Failed",
          "error_message": "Assertion failed: f_row < NbRows && f_col < NbColumns",
          "artifactory_folder": "2023_08_03_15_04_06/findings/crashes/0"
        }
      ],
      "fuzzer_stats": [
        {
          "epoch_timestamp": 1692475569,
          "timestamp": "19.08.2023 22:06:09",
          "runtime_seconds": 3601,
          "runtime": "1:00:01",
          "branch": "HEAD",
          "commit": "e9a46411",
          "commit_timestamp": "'2023-08-18 12:25:49'",
          "inputs_tested": 362065,
          "average_inputs_tested_per_second": 100,
          "new_crashes_count": 11,
          "known_crashes_count": 1,
          "blacklisted_crashes_count": 0,
          "unreproducible_crashes_count": 0,
          "total_crashes_count": 75750,
          "timeouts_count": 0,
          "artifactory_folder": "2023_08_19_22_06_09"
        }
      ]
    },
    "RbpUssPerSideObjectDetection": {
      "findings": [],
      "previously_found_findings": [],
      "fuzzer_stats": [
        {
          "epoch_timestamp": 1692475569,
          "timestamp": "19.08.2023 22:06:09",
          "runtime_seconds": 3601,
          "runtime": "1:00:01",
          "branch": "HEAD",
          "commit": "e9a46411",
          "commit_timestamp": "'2023-08-18 12:25:49'",
          "inputs_tested": 57155586,
          "average_inputs_tested_per_second": 15872,
          "new_crashes_count": 0,
          "known_crashes_count": 0,
          "blacklisted_crashes_count": 0,
          "unreproducible_crashes_count": 0,
          "total_crashes_count": 0,
          "timeouts_count": 0,
          "artifactory_folder": "2023_08_19_22_06_09"
        }
      ]
    },
    "RbpUssPerCep": {
      "findings": [
        {
          "epoch_timestamp": 1692475569,
          "timestamp": "19.08.2023 22:06:09",
          "branch": "HEAD",
          "commit": "e9a46411",
          "commit_timestamp": "'2023-08-18 12:25:49'",
          "bug_type": "Null Pointer",
          "error_message": "Unknown",
          "artifactory_folder": "2023_08_19_22_06_09/findings/crashes/2"
        },
        {
          "epoch_timestamp": 1692475569,
          "timestamp": "19.08.2023 22:06:09",
          "branch": "HEAD",
          "commit": "e9a46411",
          "commit_timestamp": "'2023-08-18 12:25:49'",
          "bug_type": "Cast Overflow",
          "error_message": "-5.0696e+20 is outside the range of representable values of type 'short int'",
          "artifactory_folder": "2023_08_19_22_06_09/findings/crashes/1"
        },
        {
          "epoch_timestamp": 1692475569,
          "timestamp": "19.08.2023 22:06:09",
          "branch": "HEAD",
          "commit": "e9a46411",
          "commit_timestamp": "'2023-08-18 12:25:49'",
          "bug_type": "Cast Overflow",
          "error_message": "2.33549e+38 is outside the range of representable values of type 'short unsigned int'",
          "artifactory_folder": "2023_08_19_22_06_09/findings/crashes/0"
        }
      ],
      "previously_found_findings": [
        {
          "epoch_timestamp": 1692475569,
          "timestamp": "19.08.2023 22:06:09",
          "branch": "HEAD",
          "commit": "e9a46411",
          "commit_timestamp": "'2023-08-18 12:25:49'",
          "bug_type": "Negative Bit Shift",
          "error_message": "shift exponent -1 is negative",
          "artifactory_folder": "2023_08_05_22_05_54/findings/crashes/2"
        },
        {
          "epoch_timestamp": 1692475569,
          "timestamp": "19.08.2023 22:06:09",
          "branch": "HEAD",
          "commit": "e9a46411",
          "commit_timestamp": "'2023-08-18 12:25:49'",
          "bug_type": "Cast Overflow",
          "error_message": "-20841.3 is outside the range of representable values of type 'short unsigned int'",
          "artifactory_folder": "2023_08_05_22_05_54/findings/crashes/1"
        },
        {
          "epoch_timestamp": 1692475569,
          "timestamp": "19.08.2023 22:06:09",
          "branch": "HEAD",
          "commit": "e9a46411",
          "commit_timestamp": "'2023-08-18 12:25:49'",
          "bug_type": "Cast Overflow",
          "error_message": "2.17091e+06 is outside the range of representable values of type 'short unsigned int'",
          "artifactory_folder": "2023_08_05_22_05_54/findings/crashes/0"
        },
        {
          "epoch_timestamp": 1692475569,
          "timestamp": "19.08.2023 22:06:09",
          "branch": "HEAD",
          "commit": "e9a46411",
          "commit_timestamp": "'2023-08-18 12:25:49'",
          "bug_type": "Assertion Failed",
          "error_message": "Assertion failed: false",
          "artifactory_folder": "2023_07_24_20_37_22/findings/crashes/0"
        }
      ],
      "fuzzer_stats": [
        {
          "epoch_timestamp": 1692475569,
          "timestamp": "19.08.2023 22:06:09",
          "runtime_seconds": 3601,
          "runtime": "1:00:01",
          "branch": "HEAD",
          "commit": "e9a46411",
          "commit_timestamp": "'2023-08-18 12:25:49'",
          "inputs_tested": 278378,
          "average_inputs_tested_per_second": 77,
          "new_crashes_count": 3,
          "known_crashes_count": 4,
          "blacklisted_crashes_count": 0,
          "unreproducible_crashes_count": 0,
          "total_crashes_count": 36576,
          "timeouts_count": 0,
          "artifactory_folder": "2023_08_19_22_06_09"
        }
      ]
    },
    "RbpUssPerEfi": {
      "findings": [
        {
          "epoch_timestamp": 1692475569,
          "timestamp": "19.08.2023 22:06:09",
          "branch": "HEAD",
          "commit": "e9a46411",
          "commit_timestamp": "'2023-08-18 12:25:49'",
          "bug_type": "Null Pointer",
          "error_message": "Unknown",
          "artifactory_folder": "2023_08_19_22_06_09/findings/crashes/5"
        },
        {
          "epoch_timestamp": 1692475569,
          "timestamp": "19.08.2023 22:06:09",
          "branch": "HEAD",
          "commit": "e9a46411",
          "commit_timestamp": "'2023-08-18 12:25:49'",
          "bug_type": "Segmentation Fault",
          "error_message": "SEGV on unknown address 0x7f40c584021c (pc 0x00000055a43e bp 0x7ffef9418870 sp 0x7ffef9418850 T0)",
          "artifactory_folder": "2023_08_19_22_06_09/findings/crashes/4"
        },
        {
          "epoch_timestamp": 1692475569,
          "timestamp": "19.08.2023 22:06:09",
          "branch": "HEAD",
          "commit": "e9a46411",
          "commit_timestamp": "'2023-08-18 12:25:49'",
          "bug_type": "Integer Overflow",
          "error_message": "signed integer overflow: 57522 * 57522 cannot be represented in type 'int'",
          "artifactory_folder": "2023_08_19_22_06_09/findings/crashes/3"
        },
        {
          "epoch_timestamp": 1692475569,
          "timestamp": "19.08.2023 22:06:09",
          "branch": "HEAD",
          "commit": "e9a46411",
          "commit_timestamp": "'2023-08-18 12:25:49'",
          "bug_type": "Null Pointer",
          "error_message": "Unknown",
          "artifactory_folder": "2023_08_19_22_06_09/findings/crashes/2"
        },
        {
          "epoch_timestamp": 1692475569,
          "timestamp": "19.08.2023 22:06:09",
          "branch": "HEAD",
          "commit": "e9a46411",
          "commit_timestamp": "'2023-08-18 12:25:49'",
          "bug_type": "Buffer Overflow",
          "error_message": "index 20 out of bounds for type 'bool [20]'",
          "artifactory_folder": "2023_08_19_22_06_09/findings/crashes/1"
        },
        {
          "epoch_timestamp": 1692475569,
          "timestamp": "19.08.2023 22:06:09",
          "branch": "HEAD",
          "commit": "e9a46411",
          "commit_timestamp": "'2023-08-18 12:25:49'",
          "bug_type": "Integer Overflow",
          "error_message": "signed integer overflow: 64448 * 64448 cannot be represented in type 'int'",
          "artifactory_folder": "2023_08_19_22_06_09/findings/crashes/0"
        }
      ],
      "previously_found_findings": [
        {
          "epoch_timestamp": 1692475569,
          "timestamp": "19.08.2023 22:06:09",
          "branch": "HEAD",
          "commit": "e9a46411",
          "commit_timestamp": "'2023-08-18 12:25:49'",
          "bug_type": "Null Pointer",
          "error_message": "ABRT on unknown address 0x1951c000aa0ee (pc 0x7fabdc92100b bp 0x7ffc785e7ed0 sp 0x7ffc785e7c00 T0)",
          "artifactory_folder": "2023_08_05_22_05_54/findings/crashes/4"
        },
        {
          "epoch_timestamp": 1692475569,
          "timestamp": "19.08.2023 22:06:09",
          "branch": "HEAD",
          "commit": "e9a46411",
          "commit_timestamp": "'2023-08-18 12:25:49'",
          "bug_type": "Null Pointer",
          "error_message": "Unknown",
          "artifactory_folder": "2023_08_05_22_05_54/findings/crashes/6"
        },
        {
          "epoch_timestamp": 1692475569,
          "timestamp": "19.08.2023 22:06:09",
          "branch": "HEAD",
          "commit": "e9a46411",
          "commit_timestamp": "'2023-08-18 12:25:49'",
          "bug_type": "Buffer Overflow",
          "error_message": "stack-buffer-overflow on address 0x7f0abc167988 at pc 0x00000045018d bp 0x7ffe305b1110 sp 0x7ffe305b08b8",
          "artifactory_folder": "2023_08_05_22_05_54/findings/crashes/5"
        },
        {
          "epoch_timestamp": 1692475569,
          "timestamp": "19.08.2023 22:06:09",
          "branch": "HEAD",
          "commit": "e9a46411",
          "commit_timestamp": "'2023-08-18 12:25:49'",
          "bug_type": "Null Pointer",
          "error_message": "Unknown",
          "artifactory_folder": "2023_08_05_22_05_54/findings/crashes/2"
        },
        {
          "epoch_timestamp": 1692475569,
          "timestamp": "19.08.2023 22:06:09",
          "branch": "HEAD",
          "commit": "e9a46411",
          "commit_timestamp": "'2023-08-18 12:25:49'",
          "bug_type": "Buffer Overflow",
          "error_message": "stack-buffer-overflow on address 0x7fce2afb79a2 at pc 0x0000005692d4 bp 0x7ffe615e18a0 sp 0x7ffe615e1890",
          "artifactory_folder": "2023_08_05_22_05_54/findings/crashes/2"
        },
        {
          "epoch_timestamp": 1692475569,
          "timestamp": "19.08.2023 22:06:09",
          "branch": "HEAD",
          "commit": "e9a46411",
          "commit_timestamp": "'2023-08-18 12:25:49'",
          "bug_type": "Buffer Overflow",
          "error_message": "index 223 out of bounds for type 'rbp_Tag_efi_Meas_st [14]'",
          "artifactory_folder": "2023_08_05_22_05_54/findings/crashes/0"
        },
        {
          "epoch_timestamp": 1692475569,
          "timestamp": "19.08.2023 22:06:09",
          "branch": "HEAD",
          "commit": "e9a46411",
          "commit_timestamp": "'2023-08-18 12:25:49'",
          "bug_type": "Buffer Overflow",
          "error_message": "index 103 out of bounds for type 'rbp_Tag_efi_EchoRange_st [14]'",
          "artifactory_folder": "2023_08_05_22_05_54/findings/crashes/1"
        }
      ],
      "fuzzer_stats": [
        {
          "epoch_timestamp": 1692475569,
          "timestamp": "19.08.2023 22:06:09",
          "runtime_seconds": 3601,
          "runtime": "1:00:01",
          "branch": "HEAD",
          "commit": "e9a46411",
          "commit_timestamp": "'2023-08-18 12:25:49'",
          "inputs_tested": 1199729,
          "average_inputs_tested_per_second": 333,
          "new_crashes_count": 6,
          "known_crashes_count": 7,
          "blacklisted_crashes_count": 0,
          "unreproducible_crashes_count": 0,
          "total_crashes_count": 97492,
          "timeouts_count": 0,
          "artifactory_folder": "2023_08_19_22_06_09"
        }
      ]
    },
    "RbpUssPerOloMap": {
      "findings": [],
      "previously_found_findings": [
        {
          "epoch_timestamp": 1692475569,
          "timestamp": "19.08.2023 22:06:09",
          "branch": "HEAD",
          "commit": "e9a46411",
          "commit_timestamp": "'2023-08-18 12:25:49'",
          "bug_type": "Null Pointer",
          "error_message": "Unknown",
          "artifactory_folder": "2023_08_16_17_17_36/findings/crashes/1"
        },
        {
          "epoch_timestamp": 1692475569,
          "timestamp": "19.08.2023 22:06:09",
          "branch": "HEAD",
          "commit": "e9a46411",
          "commit_timestamp": "'2023-08-18 12:25:49'",
          "bug_type": "Segmentation Fault",
          "error_message": "SEGV on unknown address 0x000000000296 (pc 0x0000007fe41c bp 0x7ffcad400560 sp 0x7ffcad400540 T0)",
          "artifactory_folder": "2023_08_16_17_17_36/findings/crashes/1"
        },
        {
          "epoch_timestamp": 1692475569,
          "timestamp": "19.08.2023 22:06:09",
          "branch": "HEAD",
          "commit": "e9a46411",
          "commit_timestamp": "'2023-08-18 12:25:49'",
          "bug_type": "Null Pointer",
          "error_message": "member access within null pointer of type 'struct state_cep_echoBuff'",
          "artifactory_folder": "2023_08_16_17_17_36/findings/crashes/0"
        },
        {
          "epoch_timestamp": 1692475569,
          "timestamp": "19.08.2023 22:06:09",
          "branch": "HEAD",
          "commit": "e9a46411",
          "commit_timestamp": "'2023-08-18 12:25:49'",
          "bug_type": "Assertion Failed",
          "error_message": "Assertion failed: false",
          "artifactory_folder": "2023_07_24_21_46_42/findings/crashes/5"
        }
      ],
      "fuzzer_stats": [
        {
          "epoch_timestamp": 1692475569,
          "timestamp": "19.08.2023 22:06:09",
          "runtime_seconds": 3601,
          "runtime": "1:00:01",
          "branch": "HEAD",
          "commit": "e9a46411",
          "commit_timestamp": "'2023-08-18 12:25:49'",
          "inputs_tested": 49185,
          "average_inputs_tested_per_second": 13,
          "new_crashes_count": 0,
          "known_crashes_count": 4,
          "blacklisted_crashes_count": 0,
          "unreproducible_crashes_count": 0,
          "total_crashes_count": 22446,
          "timeouts_count": 993,
          "artifactory_folder": "2023_08_19_22_06_09"
        }
      ]
    }
  }
}
`);

function flattenStats() {
  let statRows = [];

  for (let subsys in stats) {
    for (let runnable in stats[subsys]) {
      for (let finding of stats[subsys][runnable]['findings']) {
        statRows.push({
          subsys,
          runnable,
          is_new: true,
          ...finding,
        });
      }

      // TODO: dedup prev found findings. maybe not here but after all filters applied?
      // before displaying, i can look entries to remove duplicates
      for (let finding of stats[subsys][runnable][
        'previously_found_findings'
      ]) {
        statRows.push({
          subsys,
          runnable,
          is_new: false,
          mytest: '213',
          ...finding,
        });
      }
    }
  }

  return statRows;
}

const flattenedStats = flattenStats();

const fuzzyFilter = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

const fuzzySort = (rowA, rowB, columnId) => {
  let dir = 0;

  // Only sort by rank if the column has ranking information
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      rowA.columnFiltersMeta[columnId].itemRank,
      rowB.columnFiltersMeta[columnId].itemRank
    );
  }

  // Provide an alphanumeric fallback for when the item ranks are equal
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};

const renderReproduceGuide = (row) => {
  return (
    <div className="px-4 p-1">
      <pre>
        {`\
To reproduce the finding, run './go_docker.sh fuzzing' and:
fuzz_fix reproduce --input_url https://artifactory02.../${row.original.subsys}/${row.original.runnable}/${row.original.artifactory_folder}
`}
      </pre>
    </div>
  );
};

const deduplicateRows = (rows) => {
  const deduplicatedRows = [];
  const seenArtiFolders = new Set();

  // Prioritize new findings
  rows.forEach((row) => {
    if (!row.original.is_new) {
      return;
    }
    const fullArtiPath = [
      row.original.subsys,
      row.original.runnable,
      row.original.artifactory_folder,
    ].join('/');
    if (!seenArtiFolders.has(fullArtiPath)) {
      seenArtiFolders.add(fullArtiPath);
      deduplicatedRows.push(row);
    }
  });

  rows.forEach((row) => {
    if (row.original.is_new) {
      return;
    }
    const fullArtiPath = [
      row.original.subsys,
      row.original.runnable,
      row.original.artifactory_folder,
    ].join('/');
    if (!seenArtiFolders.has(fullArtiPath)) {
      seenArtiFolders.add(fullArtiPath);
      deduplicatedRows.push(row);
    }
  });

  return deduplicatedRows;
};

const columnHelper = createColumnHelper();

const columns = [
  {
    id: 'expander',
    header: () => null,
    cell: ({ row }) => {
      return row.getCanExpand() ? (
        <button
          {...{
            onClick: row.getToggleExpandedHandler(),
            style: { cursor: 'pointer' },
          }}
        >
          {row.getIsExpanded() ? '👇' : '👉'}
        </button>
      ) : (
        '🔵'
      );
    },
  },
  columnHelper.accessor('timestamp', {
    header: () => 'Timestamp',
    cell: (info) => info.getValue(),
    filterFn: 'fuzzy',
    sortingFn: fuzzySort,
  }),
  columnHelper.accessor('subsys', {
    header: () => 'Subsystem',
    cell: (info) => info.getValue(),
    filterFn: 'fuzzy',
    sortingFn: fuzzySort,
  }),
  columnHelper.accessor('runnable', {
    header: () => 'Runnable',
    cell: (info) => info.getValue(),
    filterFn: 'fuzzy',
    sortingFn: fuzzySort,
  }),
  columnHelper.accessor('is_new', {
    header: () => 'Is New',
    cell: (info) => (info.getValue() ? 'True' : 'False'),
  }),
  columnHelper.accessor('bug_type', {
    header: () => 'Bug Type',
    cell: (info) => info.getValue(),
    filterFn: 'fuzzy',
    sortingFn: fuzzySort,
  }),
  columnHelper.accessor('error_message', {
    header: () => 'Error Message',
    cell: (info) => info.getValue(),
    filterFn: 'fuzzy',
    sortingFn: fuzzySort,
  }),
  columnHelper.accessor('artifactory_folder', {
    header: () => 'Artifactory Folder',
    cell: (info) => info.getValue(),
    filterFn: 'fuzzy',
    sortingFn: fuzzySort,
  }),
];

// TODO: make second table for fuzzer stats, nav via buttons and route
// link maybe via sub component

function Main() {
  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 30 * 7 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now()),
  });

  const onDateRangeChanged = (newValue) => {
    setDateRange({
      startDate: new Date(newValue.startDate),
      endDate: new Date(newValue.endDate),
    });
  };

  const data = useMemo(() => {
    let rowsInTime = [];
    for (const row of flattenedStats) {
      const startTime = dateRange.startDate.valueOf() / 1000;
      const endTime = dateRange.endDate.valueOf() / 1000 + 24 * 60 * 60;
      if (
        row['epoch_timestamp'] >= startTime &&
        row['epoch_timestamp'] <= endTime
      ) {
        rowsInTime.push(row);
      }
    }

    return rowsInTime;
  }, [dateRange, flattenedStats]);

  const [columnFilters, setColumnFilters] = React.useState([]);
  const [globalFilter, setGlobalFilter] = React.useState('');

  const table = useReactTable({
    data,
    columns,
    getRowCanExpand: () => true,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnFilters,
      globalFilter,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  console.log(table.getRowModel().rows);

  return (
    <div className="min-h-screen prose">
      <div className="shadow-sm">
        <div className="p-2 mb-2 ml-4 flex items-center justify-left w-full space-x-10">
          <div className="text-2xl">Fuzzing OneParking</div>
          <a
            href="#"
            className="hover:bg-gray-500 hover:bg-opacity-20 px-3 py-2 rounded-md"
          >
            Findings
          </a>
          <a
            href="#"
            className="hover:bg-gray-500 hover:bg-opacity-20 px-3 py-2 rounded-md"
          >
            Fuzzer Stats
          </a>
        </div>
      </div>
      <div className="space-y-2 p-2">
        <div className="flex flex-wrap flex-row space-x-2">
          <div className="w-1/5 border rounded">
            <Datepicker
              value={dateRange}
              onChange={onDateRangeChanged}
              showShortcuts={true}
            />
          </div>
          <DebouncedInput
            value={globalFilter ?? ''}
            onChange={(value) => setGlobalFilter(String(value))}
            className="w-1/5 p-2 font-lg border"
            placeholder="Search all columns..."
          />
        </div>
      </div>
      <div>
        {data.length > 0 && (
          <table className="w-full min-w-max">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        className="px-6 py-3 text-left tracking-wider bg-blue-400 bg-opacity-30"
                      >
                        {header.isPlaceholder ? null : (
                          <>
                            <div
                              {...{
                                className: header.column.getCanSort()
                                  ? 'cursor-pointer select-none'
                                  : '',
                                onClick:
                                  header.column.getToggleSortingHandler(),
                              }}
                            >
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                              {{
                                asc: ' 🔼',
                                desc: ' 🔽',
                              }[header.column.getIsSorted()] ?? null}
                            </div>
                            {header.column.getCanFilter() ? (
                              <div>
                                <Filter column={header.column} table={table} />
                              </div>
                            ) : null}
                          </>
                        )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody>
              {deduplicateRows(table.getRowModel().rows).map((row) => {
                return (
                  <>
                    <tr
                      key={row.id}
                      className="hover:bg-gray-500 hover:bg-opacity-20"
                    >
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <td
                            key={cell.id}
                            className="px-6 py-1 whitespace-nowrap "
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        );
                      })}
                    </tr>
                    {row.getIsExpanded() && (
                      <tr>
                        <td colSpan={row.getVisibleCells().length}>
                          {renderReproduceGuide(row)}
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function Filter({ column, table }) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0].getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  const sortedUniqueValues = React.useMemo(
    () =>
      typeof firstValue === 'number'
        ? []
        : Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column.getFacetedUniqueValues()]
  );

  if (typeof firstValue === 'boolean') {
    return (
      <>
        <DebouncedInput
          type="text"
          value={columnFilterValue ?? ''}
          onChange={(value) => {
            console.log(value);
            if (['True', true, '1'].includes(value))
              column.setFilterValue(true);
            else if (['False', false, '0'].includes(value))
              column.setFilterValue(false);
            else column.setFilterValue(null);
          }}
          placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
          className="w-36 border shadow rounded"
          list={column.id + 'list'}
        />
        <div className="h-1" />
      </>
    );
  }

  return typeof firstValue === 'number' ? (
    <div>
      <div className="flex space-x-2">
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()[0] ?? '')}
          max={Number(column.getFacetedMinMaxValues()[1] ?? '')}
          value={columnFilterValue[0] ?? ''}
          onChange={(value) => column.setFilterValue((old) => [value, old[1]])}
          placeholder={`Min ${
            column.getFacetedMinMaxValues()[0]
              ? `(${column.getFacetedMinMaxValues()[0]})`
              : ''
          }`}
          className="w-24 border shadow rounded"
        />
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()[0] ?? '')}
          max={Number(column.getFacetedMinMaxValues()[1] ?? '')}
          value={columnFilterValue[1] ?? ''}
          onChange={(value) => column.setFilterValue((old) => [old[0], value])}
          placeholder={`Max ${
            column.getFacetedMinMaxValues()[1]
              ? `(${column.getFacetedMinMaxValues()[1]})`
              : ''
          }`}
          className="w-24 border shadow rounded"
        />
      </div>
      <div className="h-1" />
    </div>
  ) : (
    <>
      <datalist id={column.id + 'list'}>
        {sortedUniqueValues.slice(0, 5000).map((value) => (
          <option value={value} key={value} />
        ))}
      </datalist>
      <DebouncedInput
        type="text"
        value={columnFilterValue ?? ''}
        onChange={(value) => column.setFilterValue(value)}
        placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
        className="w-36 border shadow rounded"
        list={column.id + 'list'}
      />
      <div className="h-1" />
    </>
  );
}

// A debounced input react component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </Router>
  );
}
