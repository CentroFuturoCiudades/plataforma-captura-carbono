import ReactECharts from 'echarts-for-react';
import { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { ResponsiveChord } from '@nivo/chord';


const color_map_base_chord = {
"croplands": "#B8860B",
"flooded": "#4169E1",
"forests_primary": "#006400",
"forests_secondary": "#228B22",
"grasslands": "#90EE90",
"other": "#9932CC",
"pastures": "#FFD700",
"settlements": "#808080",
"shrublands": "#FFA07A",
"wetlands": "#40E0D0",
}


const color_map_base = {
"Croplands": "#B8860B",
"Flooded": "#4169E1",
"Primary forests": "#006400",
"Secondary forests": "#228B22",
"Grasslands": "#90EE90",
"Other": "#9932CC",
"Pastures": "#FFD700",
"Settlements": "#808080",
"Shrublands": "#FFA07A",
"Wetlands": "#40E0D0",
}

const COLUMN_NAME_MAP = {
  croplands: 'Croplands',
  flooded: 'Flooded',
  forests_primary: 'Primary forests',
  forests_secondary: 'Secondary forests',
  grasslands: 'Grasslands',
  other: 'Other',
  pastures: 'Pastures',
  settlements: 'Settlements',
  shrublands: 'Shrublands',
  wetlands: 'Wetlands',
};

const NAME_MAP = {
  emission_co2e_subsector_total_frst:        'Forests',
  emission_co2e_subsector_total_lndu:        'Land use transitions',
  emission_co2e_co2_soil_soc_mineral_soils:  'Soil mineralization',
  emission_co2e_n2o_soil_mineral_soils:      'Soil mineralization (N2O equiv.)',
  emission_co2e_n2o_soil_organic_soils:      'Organic soil (N2O equiv.)',
}


export const BosquesPrimSecChart = () => {
  const [years, setYears] = useState([]);
  const [values, setValues] = useState([]);

  useEffect(() => {
    Papa.parse('/data/csv/area.csv', {
      download:       true,
      header:         true,
      dynamicTyping:  true,
      skipEmptyLines: true,
      complete: ({ data }) => {
        if (!data.length) return console.error('CSV load error');

        const yearCols = Object.keys(data[0]).filter(k => k !== 'label');

        const pivoted = yearCols.map(offset => {
          const year = String(2000 + Number(offset));
          const entry = { year };
          data.forEach(row => {
          
            const colName = COLUMN_NAME_MAP[row.label];
            entry[colName] = (row[offset] || 0) / 100;
          });

         

          return entry;
        })
        // keep only 2000–2020
        .filter(d => +d.year >= 2000 && +d.year <= 2020);

        

        // **THIS** is your axis=1 sum:
        // for each year-object, add Primary + Secondary
        const ys = pivoted.map(d => d.year);
        const vs = pivoted.map(
          d => (d['Primary forests'] || 0) + (d['Secondary forests'] || 0)
        );


        setYears(ys);
        setValues(vs);
      }
    });
  }, []);


  const option = {
    title: { text: 'Área de bosques primarios y secundarios' },
    textStyle : {color: '#fff'},
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: years },
    yAxis: { type: 'value', name: 'Área (km²)' },
    series: [
      {
        name: 'Bosques',
        type: 'line',
        data: values,
        smooth: false,
        lineStyle: { width: 2 },
        itemStyle: { color: color_map_base['Primary forests'] }, // Added itemStyle here
        markArea: {
          itemStyle: { color: 'rgba(255,0,0,0.2)' },
          data: [
            [{ xAxis: '2002' }, { xAxis: '2004' }],
            [{ xAxis: '2011' }, { xAxis: '2013' }],
          ]
        }
      }
    ]
  };

  return <ReactECharts option={option} style={{ height: 500, width: '50%' }} />;
};

export  function MaskedStackedArea() {
    const baseOption = {
        tooltip: { trigger: 'axis' },
        legend: {
            type: 'scroll',
            orient: 'vertical',
            right: 10,
            top: 20,
            bottom: 20,
            textStyle : {color: '#fff'},
        },
        textStyle : {color: '#fff'},
        grid: { left: '3%', right: '20%', bottom: '30%', containLabel: true },
        xAxis: {
            name: 'Año',
            type: 'category',
            boundaryGap: false,
            data: [],             // ← will fill this in later
            axisLabel: { rotate: 90 }
        },
        yAxis: {
            type: 'value',
            name: 'Area (km²)',
            axisLabel: {
            formatter: v =>
                v.toLocaleString(undefined, { minimumFractionDigits: 0 })
            }
        },
        series: []             // ← will fill this in later
    };
  const [option, setOption] = useState(baseOption);

  useEffect(() => {
    Papa.parse('/data/csv/area.csv', {
      download: true,
      header: true,
      complete: ({ data }) => {
        // --- pivot & mask logic ---
        const classes = data.map(row => {
          const name = COLUMN_NAME_MAP[row.label] || row.label;
          const values = Object.entries(row)
            .filter(([k]) => k !== 'label')
            .map(([off, v]) => ({
              year: String(2000 + +off),
              value: +v / 100
            }))
            .filter(d => +d.year >= 2000 && +d.year <= 2020);
          return { name, values };
        });

        const years = Array.from(
          new Set(classes.flatMap(c => c.values.map(v => v.year)))
        ).sort();

        const totalByYear = years.reduce((acc, y) => {
          acc[y] = classes
            .map(c => c.values.find(v => v.year === y)?.value || 0)
            .reduce((s, x) => s + x, 0);
          return acc;
        }, {});

        const filtered = classes.filter(c =>
          c.values.some(v => v.value / (totalByYear[v.year]||1) >= 0.01)
        );

        const series = filtered.map(c => ({
          name: c.name,
          type: 'line',
          stack: 'Total',
          smooth: true,
          areaStyle: {},
          lineStyle: { width: 0 },
          emphasis: { focus: 'series' },
          itemStyle: { color: color_map_base[c.name] },
          data: years.map(y => c.values.find(v => v.year === y)?.value || 0)
        }));

        // 3) merge in the computed axes & series
        setOption(opt => ({
          ...opt,
          xAxis: { ...opt.xAxis, data: years },
          series
        }));
      }
    });
  }, []);

  return (
    <ReactECharts
      option={option}
      style={{ height: 500, width: '100%' }}
      notMerge={true}
      lazyUpdate={true}
    />
  );
}



export function MyChord() {
  const THRESHOLD = 10 * 1e6
  const [matrix, setMatrix] = useState([])
  const [keys, setKeys] = useState([])
  const [colors, setColors] = useState([])

  useEffect(() => {
    Papa.parse('/data/csv/table_extra.csv', {
      download: true,
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: ({ data }) => {
        // 1. extract all category-columns (everything except the 'start' index)
        const categories = Object.keys(data[0]).filter((c) => c !== 'start')

        // 2. compute column sums and row sums
        const colSums = {}
        categories.forEach((cat) => {
          colSums[cat] = data.reduce((sum, row) => sum + (row[cat] || 0), 0)
        })
        const rowSums = {}
        data.forEach((row) => {
          rowSums[row.start] = categories.reduce(
            (sum, cat) => sum + (row[cat] || 0),
            0
          )
        })

        // 3. pick only those categories with both colSum > THRESHOLD and rowSum > THRESHOLD
        const wanted = categories.filter(
          (cat) => colSums[cat] > THRESHOLD && rowSums[cat] > THRESHOLD
        )

        // 4. filter your rows to only those whose index ('start') is in wanted
        const filteredRows = data.filter((row) => wanted.includes(row.start))

        // 5. build the matrix and zero out the diagonal
        const mat = filteredRows.map((row, i) =>
          wanted.map((cat, j) => (i === j ? 0 : row[cat] || 0))
        )

        // 6. map keys → display names and colors
        const displayKeys = wanted.map((cat) => COLUMN_NAME_MAP[cat] || cat)
        const displayColors = wanted.map(
          (cat) => color_map_base_chord[cat] || '#999'
        )

        setMatrix(mat)
        setKeys(displayKeys)
        setColors(displayColors)
      },
    })
  }, [])

  return (
    <div style={{ height: 375, width: '100%' }}>
      <ResponsiveChord
        data={matrix}
        keys={keys}
        colors={colors}
        margin={{ top: 35, right: 100, bottom: 35, left: 60 }}
        padAngle={0.06}
        labelTextColor="#fff"
        arcLabelTextColor="#fff"
        legends={[
          {
            anchor: 'right',
            direction: 'column',
            translateY: 70,
            itemWidth: 100,
            itemHeight: 16,
            itemsSpacing: 14,
            symbolShape: 'circle',
            itemTextColor: '#fff',
          },
        ]}
        theme={{
          labels: { text: { fill: '#fff' } },
          legends: { text: { fill: '#fff' } },
        }}
      />
    </div>
  )
}


export function CarbonStackedLineChart() {
  const baseOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
    },
    legend: {
      data: [],    // ← we’ll fill this dynamically below
      top: 0,
      left: 'center',
      textStyle : {color: '#fff'},
    },
    grid: { top: 100, right: 60, bottom: 60, left: 100 },
    xAxis: {
      name: 'Año',
      type: 'category',
      data: [],    // ← years go here
      axisLabel: { rotate: 90 },
    },
    textStyle : {color: '#fff'},
    yAxis: {
      type: 'value',
      name: 'CO₂ emitido (millones de toneladas)',
    },
    series: [],   // ← series go here
  }
  const [option, setOption] = useState(baseOption)

  useEffect(() => {
    Papa.parse('/data/csv/emissions.csv', {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: ({ data }) => {
        // filter & prep
        const rows = data.filter(r => r.time_period != null && r.time_period < 21)
        const years = rows.map(r => r.time_period + 2000)
        const keys  = Object.keys(NAME_MAP)
        const stacks = keys.map(key => rows.map(r => +r[key] || 0))
        const net    = years.map((_, i) =>
          stacks.reduce((sum, series) => sum + series[i], 0)
        )

        // build the five bar series + one line series
        const series = [
          ...stacks.map((values, idx) => (

            {
            name: NAME_MAP[keys[idx]],
            type: 'bar',
            stack: 'stack',
            data: values,
          
          })),
          {
            name: 'Neto',
            type: 'line',
            data: net,
            lineStyle: { width: 2 },
          },
        ]

        // assemble the final option by merging in dynamic bits
        setOption({
          ...baseOption,
          legend: {
            ...baseOption.legend,
            data: [...Object.values(NAME_MAP), 'Neto'],
          },
          xAxis: {
            ...baseOption.xAxis,
            data: years,
          },
          series,
        })
      },
    })
  }, [])

  return (
    <ReactECharts
      style={{ height: "100%", width: '100%' }}
      option={option}
      notMerge={true}
      lazyUpdate={true}
    />
  )
}






export function TransitionsEmissionsChart() {

  function prettifyColumn(rawKey) {
  const prefix = "emission_co2e_co2_lndu_conversion_"
  if (!rawKey.startsWith(prefix)) return rawKey
  const [start, end] = rawKey
    .slice(prefix.length)
    .split("_to_")
  return `${COLUMN_NAME_MAP[start]}-${COLUMN_NAME_MAP[end]}`
}

  const baseOption = {
 
  textStyle : {color: '#fff'},

  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'shadow' },
  },
  legend: {
    data: [],       // ← fill dynamically
    top: 0,
    right: 30,
    textStyle : {color: '#fff'},
  },
  grid: {
    top: 40,
    left: 75,
    right: 60,
    bottom: 100,
    containLabel: true,
  },
  xAxis: {
    name: 'Año',
    type: 'category',
    data: [],       // ← fill dynamically
    axisLabel: { rotate: 90 },
  },
  yAxis: {
    type: 'value',
    name: 'CO₂ emitido (millones de toneladas)',
  },
  series: []       // ← fill dynamically
}

  const [option, setOption] = useState(baseOption)

  useEffect(() => {
    Papa.parse('/data/csv/transitions_emissions.csv', {
      download: true,
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: ({ data }) => {
        // assign year=2000…2035, then filter to ≤2020
        const rows = data
          .map((r, i) => ({ ...r, year: 2000 + i }))
          .filter(r => r.year <= 2020)

        // group by (year, end)
        const grouping = {}
        rows.forEach(r => {
          Object.entries(r).forEach(([key, val]) => {
            if (key === 'year' || key.startsWith('Unnamed')) return
            const pretty = prettifyColumn(key)                // e.g. "Croplands-Pastures"
            const [, end] = pretty.split('-')                 // e.g. "Pastures"
            if (!['Croplands','Pastures','Settlements'].includes(end)) return
            grouping[r.year] = grouping[r.year] || {}
            grouping[r.year][end] = (grouping[r.year][end] || 0) + Number(val || 0)
          })
        })

        // sorted years
        const years = Object.keys(grouping)
          .map(y => Number(y))
          .sort((a, b) => a - b)

        // build bar series for each end-class
        const ends = ['Croplands','Pastures','Settlements']
        const barSeries = ends.map(end => (

          {
          name: end,
          type: 'bar',
          stack: 'total',
          itemStyle: {
            color: color_map_base[
              end
            ]
          },
          data: years.map(y => grouping[y][end] || 0)
        }))

        // build total line
        const totalLine = {
          name: 'Total',
          type: 'line',
          data: years.map(
            y => ends.reduce((sum, e) => sum + (grouping[y][e]||0), 0)
          ),
          lineStyle: { width: 2 },
          itemStyle: { color: '#000' }
        }

        // merge into baseOption
        setOption({
          ...baseOption,
          legend: {
            ...baseOption.legend,
            data: [...ends, 'Total'],
          },
          xAxis: {
            ...baseOption.xAxis,
            data: years,
          },
          series: [
            ...barSeries,
            totalLine
          ]
        })
      }
    })
  }, [])

  return (
    <ReactECharts
      option={option}
      style={{ height: 400, width: '100%' }}
      notMerge={true}
      lazyUpdate={true}
    />
  )
}

export function SettlementDestinationEmissionsChart() {
  // static chart config
  const baseOption = {
    
    
    textStyle : {color: '#fff'},
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
    },
    legend: { show: false },
    grid: {
      top: 30,
      left: 80,
      right: 60,
      bottom: 85,
      containLabel: true,
      textStyle : {color: '#fff'},
    },
    xAxis: {
      type: 'category',
      name: 'Año',
      data: [],           // ← filled at runtime
      axisLabel: { rotate: 90 },
    },
    yAxis: {
      type: 'value',
      name: 'CO₂ emitido (miles de toneladas)',
    },
    series: []          // ← filled at runtime
  }

  const [option, setOption] = useState(baseOption)

  useEffect(() => {
    Papa.parse('/data/csv/transitions_emissions.csv', {
      download: true,
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: ({ data }) => {
        // 1) assign year = 2000 + rowIndex, filter to ≤2020
        const rows = data
          .map((r, i) => ({ ...r, year: 2000 + i }))
          .filter(r => r.year <= 2020)

        // 2) sum only the “settlements” destination
        const sumsByYear = {}
        rows.forEach(r => {
          Object.entries(r).forEach(([key, val]) => {
            if (key === 'year' || key.startsWith('Unnamed')) return
            // the slug always comes after “…conversion_”
            const parts = key.split('conversion_')
            if (parts.length < 2) return
            const [startTo, endSlug] = parts[1].split('_to_')
            if (endSlug !== 'settlements') return
            const y = r.year
            sumsByYear[y] = (sumsByYear[y] || 0) + Number(val || 0)
          })
        })

        // 3) build sorted arrays of years & values×1000
        const years = Object.keys(sumsByYear)
          .map(Number)
          .sort((a, b) => a - b)
        const values = years.map(y => sumsByYear[y] * 1000)

        // 4) single line+area series for “Settlements”
        const slug = 'Settlements'
        const color = color_map_base[slug]

        const series = [
          {
            name: 'Settlements',
            type: 'line',
            data: values,
            showSymbol: false,
            lineStyle: { width: 2, color },
            areaStyle: { color, opacity: 0.3 },
          }
        ]

        // 5) merge in only xAxis.data & series
        setOption({
          ...baseOption,
          xAxis: { ...baseOption.xAxis, data: years },
          series,
        })
      }
    })
  }, [])

  return (
    <ReactECharts
      option={option}
      style={{ height: 400, width: '100%' }}
      notMerge={true}
      lazyUpdate={true}
    />
  )
}

export function Emissions_Lost_Forest() {
  const prettifyColumn = rawKey => {
    const prefix = 'emission_co2e_co2_lndu_conversion_';
    if (!rawKey.startsWith(prefix)) return rawKey;
    const [start, end] = rawKey.slice(prefix.length).split('_to_');
    return `${COLUMN_NAME_MAP[start]}-${COLUMN_NAME_MAP[end]}`;
  };

  const baseOption = {

    textStyle: { color: '#fff' },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross' }
    },
    grid: {
      top: 40,
      left: 70,
      right: 60,
      bottom: 100,
      containLabel: true
    },
    xAxis: {
      name: 'Año',
      type: 'category',
      data: [],           // ← filled at runtime
      axisLabel: { color: '#fff' }
    },
    yAxis: {
      type: 'value',
      name: 'CO₂ emitido (miles de toneladas)',
      nameTextStyle: { color: '#fff' },
      axisLabel: { color: '#fff' }
    },
    series: []          // ← filled at runtime
  };


  const [option, setOption] = useState(baseOption);

  useEffect(() => {
    Papa.parse('/data/csv/transitions_emissions.csv', {
      download: true,
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: ({ data }) => {
        // 1) build rows with year and filter ≤2020
        const rows = data
          .map((r, i) => ({ ...r, year: 2000 + i }))
          .filter(r => r.year <= 2020);

        // 2) sum only the two forest‐loss columns per year
        const grouping = {};
        rows.forEach(r => {
          Object.entries(r).forEach(([key, val]) => {
            if (key === 'year' || key.startsWith('Unnamed')) return;
            const pretty = prettifyColumn(key);            // e.g. "Primary forests-Settlements"
            const [forestType] = pretty.split('-');
            if (!['Primary forests', 'Secondary forests'].includes(forestType)) return;
            grouping[r.year] = grouping[r.year] || 0;
            grouping[r.year] += Number(val || 0);
          });
        });

        // 3) extract sorted years and total values
        const years = Object.keys(grouping).map(Number).sort((a, b) => a - b);
        const totals = years.map(y => grouping[y]);

        // 4) single “area” series
        const areaSeries = {
          name: 'Total',
          type: 'line',
          smooth: true,
          areaStyle: { opacity: 0.3 },
          lineStyle: { width: 2 },
          itemStyle: { color: '#c23531' },
          data: totals
        };

        setOption({
          ...baseOption,
          xAxis: { ...baseOption.xAxis, data: years },
          series: [areaSeries]
        });
      }
    });
  }, []);


  return (
    <ReactECharts
      option={option}
      style={{ height: 400, width: '100%' }}
      notMerge={true}
      lazyUpdate={true}
    />
  );
}
