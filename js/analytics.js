// Analytics Dashboard - Chart.js Implementation
// Analytics Dashboard - Counsellor Specific
class AnalyticsDashboard {
    constructor() {
        this.charts = {};
        this.activityTimeRange = 'month';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeCharts();
        console.log('Counsellor Analytics Dashboard initialized');
    }

    setupEventListeners() {
        // Activity Time Range Filter
        const activityTimeRangeSelect = document.getElementById('activityTimeRange');
        
        if (activityTimeRangeSelect) {
            activityTimeRangeSelect.addEventListener('change', (e) => {
                this.activityTimeRange = e.target.value;
                this.updateActivityChart();
            });
        }
    }

    initializeCharts() {
        this.initializeActivityChart();
        this.initializeAchievementsChart();
    }

    initializeActivityChart() {
        const ctx = document.getElementById('counsellorActivityChart');
        if (ctx && !this.charts.activity) {
            this.charts.activity = new Chart(ctx, {
                type: 'bar',
                data: this.getActivityData(),
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            });
        }
    }

    initializeAchievementsChart() {
        const ctx = document.getElementById('achievementsChart');
        if (ctx && !this.charts.achievements) {
            this.charts.achievements = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['Client Appreciation', 'Excellence Awards', 'Certifications', 'Community Milestones'],
                    datasets: [{
                        data: [45, 15, 25, 15],
                        backgroundColor: [
                            '#B8B5FF', // Soft Purple
                            '#FFB5E8', // Light Pink
                            '#B5D8FF', // Baby Blue
                            '#E0F7E9'  // Mint Green
                        ],
                        borderWidth: 2,
                        borderColor: '#ffffff'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                padding: 20,
                                usePointStyle: true
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    let label = context.label || '';
                                    if (label) {
                                        label += ': ';
                                    }
                                    let value = context.parsed;
                                    let total = context.chart._metasets[context.datasetIndex].total;
                                    let percentage = Math.round((value / total) * 100) + '%';
                                    return label + value + ' (' + percentage + ')';
                                }
                            }
                        }
                    }
                }
            });
        }
    }

    getActivityData() {
        // Data generation logic based on time range
        let labels, data;

        const baseColors = '#B8B5FF';
        const hoverColors = '#9A96F0';

        if (this.activityTimeRange === 'week') {
            labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            data = [5, 8, 6, 9, 7, 4, 3]; // Sessions per day
        } else if (this.activityTimeRange === 'month') {
            labels = ['Sessions', 'Articles', 'Posts', 'Workshops', 'Reviews'];
            data = [45, 8, 15, 3, 22]; 
        } else { // Year
             labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
             data = [35, 42, 38, 45, 50, 55, 60, 58, 62, 65, 70, 75]; // Total sessions per month
        }

        return {
            labels: labels,
            datasets: [{
                label: 'Activities Count',
                data: data,
                backgroundColor: baseColors,
                hoverBackgroundColor: hoverColors,
                borderRadius: 5
            }]
        };
    }

    updateActivityChart() {
        if (this.charts.activity) {
            const newData = this.getActivityData();
            this.charts.activity.data = newData;
            this.charts.activity.update();
        }
    }
}

// Global function for updating trends chart
function updateTrendsChart() {
    if (window.analyticsDashboard) {
        window.analyticsDashboard.updateTrendsChart();
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.analyticsDashboard = new AnalyticsDashboard();
});