<%@ page import="frontlinesms2.*" %>
<div id="tabs-2">
	<g:if test="${fconnectionInstance}">
		<div id="${fconnectionInstance.shortName}-form">
			<h2><g:message code="${fconnectionInstance.class.simpleName.toLowerCase()}.label"/></h2>
			<fsms:inputs instance="${fconnectionInstance}" instanceClass="${fconnectionInstance.class}"/>
		</div>
	</g:if>
	<g:else>
		<g:each in="${Fconnection.implementations}">
			<div id="${it.shortName}-form">
				<h2><g:message code="${it.simpleName.toLowerCase()}.label"/></h2>
				<fsms:inputs instance="${fconnectionInstance}" instanceClass="${it}"/>
			</div>
		</g:each>
	</g:else>
</div>
