

// Initialize the chart
var chart = Highcharts.mapChart('container', {

    title: {
        text: 'Syria Interactive map'
    },

    legend: {
        align: 'left',
        layout: 'vertical',
        floating: true
    },

    mapNavigation: {
        enabled: true
    },

    tooltip: {
        formatter: function () {
            return this.point.id + (
                this.point.lat ?
                '<br>Number of IDPs: ' + this.point.lat: ''
            );
        }
    },

    plotOptions: {
        series: {
            marker: {
                fillColor: '#FFFFFF',
                lineWidth: 2,
                lineColor: Highcharts.getOptions().colors[1]
            }
        }
    },

    series: [{
        // Use the gb-all map with no data as a basemap
        mapData: Highcharts.maps['countries/sy/sy-all'],
        keys: ['code_hasc', 'value'],
            joinBy: 'code_hasc',
            name: 'Random data',
            states: {
                hover: {
                    color: '#a4edba'
                }
            },
        borderColor: '#666666',
        nullColor: 'rgba(200, 200, 200, 0.3)',
        showInLegend: false
    }, {
        name: 'Separators',
        type: 'mapline',
        data: Highcharts.geojson(Highcharts.maps['countries/sy/sy-all'], 'mapline'),
        color: '#9fa3a1',
        showInLegend: false,
        enableMouseTracking: false
    }, {
        // Specify cities using lat/lon
        type: 'mappoint',
        name: 'Governorates',
        dataLabels: {
            format: '{point.id}'
        },
        // Use id instead of name to allow for referencing points later using
        // chart.get
        data: [{
            id: 'Damascus',
            lat: 33.517175,
            lon: 36.27671
        }, {
             id: 'Aleppo',
            lat: 36.310003,
            lon: 37.205732
        }, {
             id: 'Rural Damascus',
            lat: 33.313482,
            lon: 37.321121 
        }, {
           id: 'Homs',
            lat: 34.4623,
            lon: 38.2423
        }, {
            id: 'Hama',
            lat: 35.122096,
            lon: 36.861707
        }, {
             id: 'Lattakia',
            lat: 35.587201,
            lon: 35.850598
        }, {
            id: 'Idleb',
            lat: 35.885585,
            lon: 36.441917
        }, {
             id: 'Quneitra',
            lat: 33.052686,
            lon: 35.865886,
        }, {
             id: 'As-Sweida',
            lat: 32.787710,
            lon: 36.53365
        },  {
            id: 'Dara',
            lat: 32.904969,
            lon: 36.156751
        },{
            id: 'Tartous',
            lat: 34.930081,
            lon: 36.071186
        }, {
            id: 'Ar-Raqqa',
            lat: 35.961465,
            lon: 38.646968
        },{
           id: 'Al-Hasakeh',
            lat: 36.614218,
            lon: 40.729504
        }, {
             id: 'Deir-ez-Zor',
            lat: 35.420632,
            lon: 40.052596,
            dataLabels: {
                align: 'left',
                x: 5,
                verticalAlign: 'middle'
            }
        }]
    }]
});


// Function to return an SVG path between two points, with an arc
function pointsToPath(from, to, invertArc) {
    var arcPointX = (from.x + to.x) / (invertArc ? 2.4 : 1.6),
        arcPointY = (from.y + to.y) / (invertArc ? 2.4 : 1.6);
    return 'M' + from.x + ',' + from.y + 'Q' + arcPointX + ' ' + arcPointY +
            ',' + to.x + ' ' + to.y;
}

var aleppoPoint = chart.get('Aleppo'),
    daraPoint = chart.get('Dara');

// Add a series of lines for London
chart.addSeries({
    name: 'IDPs',
    type: 'mapline',
    lineWidth: 2,
    color: Highcharts.getOptions().colors[3],
    data: [{
        id: 'Aleppo - Dara',
        path: pointsToPath(aleppoPoint, chart.get('Dara'))
    }, {
        id: 'Aleppo - Idleb',
        path: pointsToPath(aleppoPoint, chart.get('Idleb'), true)
    }, {
        id: 'Aleppo - Hama',
        path: pointsToPath(aleppoPoint, chart.get('Hama'))
    }, {
        id: 'Aleppo - Damascus',
        path: pointsToPath(aleppoPoint, chart.get('Damascus'), true)
    }, {
        id: 'Aleppo - Rural Damascus',
        path: pointsToPath(aleppoPoint, chart.get('Rural Damascus'))
    }, {
        id: 'Aleppo - Homs',
        path: pointsToPath(aleppoPoint, chart.get('Homs'), true)
    }, {
        id: 'Aleppo - Deir-ez-Zor',
        path: pointsToPath(aleppoPoint, chart.get('Deir-ez-Zor'), true)
    }, { id: 'Aleppo - Lattakia : 1,500 IDPs',
    path: pointsToPath(aleppoPoint, chart.get('Lattakia'), true)
}]
});

// Add a series of lines for Lerwick
chart.addSeries({
    name: 'Returnees',
    type: 'mapline',
    lineWidth: 4,
    color: Highcharts.getOptions().colors[5],
    data: [{
        id: 'From Dara to Deir-ez-Zor ',
        path: pointsToPath(daraPoint, chart.get('Deir-ez-Zor'))
    }, {
        id: 'From Dara to Ar-Raqqa',
        path: pointsToPath(daraPoint, chart.get('Ar-Raqqa'))
    }, {
        id: 'From Dara to As-Sweida',
        path: pointsToPath(daraPoint, chart.get('As-Sweida'))
    }, {
        id: 'From Dara to Quneitra',
        path: pointsToPath(daraPoint, chart.get('Quneitra'))
    }]
});
