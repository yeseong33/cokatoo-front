import { TabulatorFull as Tabulator } from 'tabulator-tables'
import 'tabulator-tables/dist/css/tabulator_site.min.css'

export function initTable(tableRef) {
  new Tabulator(tableRef, {
    height: '311px',
    columns: [
      { title: '순위', field: 'rank', sorter: 'number' },
      { title: '이름', field: 'name' },
      { title: '성별', field: 'gender' },
      { title: '이메일', field: 'email' }
    ],
    data: [
      { rank: 1, name: '오예성', gender: 'Male', email: 'john.doe@example.com' },
      { rank: 2, name: '김우진', gender: 'Female', email: 'jane.smith@example.com' },
      { rank: 3, name: '정은진', gender: 'Female', email: 'alice.johnson@example.com' },
      { rank: 4, name: '이진혁', gender: 'Male', email: 'bob.brown@example.com' },
      { rank: 5, name: '최민혁', gender: 'Male', email: 'charlie.davis@example.com' },
      { rank: 6, name: '김정준', gender: 'Female', email: 'dana.lee@example.com' },
      { rank: 7, name: '김남일', gender: 'Female', email: 'eva.martinez@example.com' },
      { rank: 8, name: '강민정', gender: 'Male', email: 'frank.wilson@example.com' },
      { rank: 9, name: '박인호', gender: 'Female', email: 'grace.thompson@example.com' },
      { rank: 10, name: '김성중', gender: 'Male', email: 'henry.clark@example.com' }
    ],
    layout: 'fitColumns', // 컬럼 너비 조정
    rowFormatter: function (row) {
      // 각 행에 하얀색 텍스트 적용
      const element = row.getElement()
      element.style.color = '#ffffff'
      element.style.backgroundColor = '#444444'
    }
  })

  tableRef.style.backgroundColor = '#171717'
}
