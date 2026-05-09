function setupTableRows() {
        loadHtmlElement("Calian/Calian.html", "Calian")
        loadHtmlElement("LockheedMartinCdl/LockheedMartinCdl.html", "LockheedMartinCdl")
        loadHtmlElement("CalgaryCounsellingCentre/CalgaryCounsellingCentre.html", "CalgaryCounsellingCentre")
}

function setupCalianModals() {
    PopulatePreModalTitle('Calian/ModernVsCodeOnLegacySystems.html', 'ModernVsCodeTableData')
    PopulatePreModalTitle('Calian/NonDefaultJavaTruststore.html', 'NonDefaultJavaTruststoreTableData')
    PopulatePreModalTitle('Calian/DnsLogger.html', 'DnsLoggerTableData')
    PopulatePreModalTitle('Calian/FortilogVpnTracking.html', 'FortilogVpnTrackingTableData')
    PopulatePreModalTitle('Calian/Grafana.html', 'GrafanaTableData')
    PopulatePreModalTitle('Calian/UdpRedirect.html', 'UdpRedirectTableData')
    PopulatePreModalTitle('Calian/OsUpgrade.html', 'OsUpgradeTableData')
}