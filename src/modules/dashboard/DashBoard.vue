<template>
  <div>
    <div style="height: 100dvh;" id="reportContainer"></div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import * as pbi from 'powerbi-client';

export default {
  setup() {
    const reportContainer = ref(null);

    onMounted(() => {
      embedReport(reportContainer.value);
    });

    const embedReport = (container) => {
      const config = {
        type: 'report',
        tokenType: pbi.models.TokenType.Aad,
        id: 'c8405f67-1f15-40f5-b0d4-f851e7d23401',
        embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=c8405f67-1f15-40f5-b0d4-f851e7d23401&groupId=f58ad389-fbd1-4aa4-a8c3-87c59b0626c3&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVBBQVMtMS1TQ1VTLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJ1c2FnZU1ldHJpY3NWTmV4dCI6dHJ1ZSwiZGlzYWJsZUFuZ3VsYXJKU0Jvb3RzdHJhcFJlcG9ydEVtYmVkIjp0cnVlfX0%3d', // Reemplaza con tu URL de inserción
        accessToken: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IlQxU3QtZExUdnlXUmd4Ql82NzZ1OGtyWFMtSSIsImtpZCI6IlQxU3QtZExUdnlXUmd4Ql82NzZ1OGtyWFMtSSJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvOGQyNmY4MDAtZDdjMy00NDNmLTljODAtMjYwYjVhMzBlZTVkLyIsImlhdCI6MTcwMzAwNTEzMywibmJmIjoxNzAzMDA1MTMzLCJleHAiOjE3MDMwMTAxMjAsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84VkFBQUFIK0hHRFVrdmQ0NHNqQjNYK21qZExUQXR4aHVWVzFRR01sWUlqaEFZdEpTZFQvQlk3cEtmZkp4K3UxRDN2elpFIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6ImJmOWE5YjY0LWJlNzgtNGY4MS1iMDA1LTUxZjFiOGJkNTc2ZiIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiUG93ZXIgQkkgMiIsImdpdmVuX25hbWUiOiJDdWVudGEgR3J1dmVyIiwiaXBhZGRyIjoiMjAxLjEyMy4yMzMuNzEiLCJuYW1lIjoiQ3VlbnRhIFBvd2VyIEJJIDIiLCJvaWQiOiJkYTVlMDc0ZC0zNzA4LTQ0YzgtODE5NS1hYTJiYWQ4NzRkY2YiLCJvbnByZW1fc2lkIjoiUy0xLTUtMjEtMzY0MDc2NjQ4MC0yNzk4OTMwNDQyLTg1ODgxMTYyLTc5MjYiLCJwdWlkIjoiMTAwMzIwMDEyRkMxNjIyQyIsInJoIjoiMC5BUzBBQVBnbWpjUFhQMFNjZ0NZTFdqRHVYUWtBQUFBQUFBQUF3QUFBQUFBQUFBRDNBTlkuIiwic2NwIjoiQXBwLlJlYWQuQWxsIENhcGFjaXR5LlJlYWQuQWxsIENhcGFjaXR5LlJlYWRXcml0ZS5BbGwgQ29udGVudC5DcmVhdGUgRGFzaGJvYXJkLlJlYWQuQWxsIERhc2hib2FyZC5SZWFkV3JpdGUuQWxsIERhdGFmbG93LlJlYWQuQWxsIERhdGFmbG93LlJlYWRXcml0ZS5BbGwgRGF0YXNldC5SZWFkLkFsbCBEYXRhc2V0LlJlYWRXcml0ZS5BbGwgR2F0ZXdheS5SZWFkLkFsbCBHYXRld2F5LlJlYWRXcml0ZS5BbGwgUmVwb3J0LlJlYWQuQWxsIFJlcG9ydC5SZWFkV3JpdGUuQWxsIFN0b3JhZ2VBY2NvdW50LlJlYWQuQWxsIFN0b3JhZ2VBY2NvdW50LlJlYWRXcml0ZS5BbGwgV29ya3NwYWNlLlJlYWQuQWxsIFdvcmtzcGFjZS5SZWFkV3JpdGUuQWxsIiwic3ViIjoiQVpnNDl1MUFiNlV0d1hmVlV2ZUtBNjVIUzJ6QXB0Vi0wcTVXYlpWYzNxbyIsInRpZCI6IjhkMjZmODAwLWQ3YzMtNDQzZi05YzgwLTI2MGI1YTMwZWU1ZCIsInVuaXF1ZV9uYW1lIjoicG93ZXJiaTJAZ3J1dmVyLm14IiwidXBuIjoicG93ZXJiaTJAZ3J1dmVyLm14IiwidXRpIjoibzJ5dGQzeWdvRVM5Tzhmd0tEV2lBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il19.ESqjE82h59S8pSuXvm28tiaosg_2vS_nG7T8VQ84UxPV1Z9zzxauQakaO4EF9Vu5k0wEgoCPH9MvEGyxXZYMBcTbViF7OUYYsJFUndijgxXquvX6AOz-ouVFLgtwDlKZDl2Zv1rd_oDSbn7BvswCg8BO_lB92_wD2bI8VLnO9hJgmWbqIVjP6At0hP_5az9xHGGpZh3iX57DnwQGVurbUoqCWknv14Z_Qq0BY55lH-pXezIKEHVvYf2Q_uKf03GZOBvPH-duREK7TwxPgeMlu76R4mdOHLAdvL8guOTGZwL0hAc3gqlkkIq3Qq7bWqHivcM05nURkXo2D84aP3iM9w', // Puedes obtener esto desde el backend
        permissions: pbi.models.Permissions.All
      }

      let reportContainer = document.getElementById('reportContainer')
      let powerbi = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory)
      let report = powerbi.embed(reportContainer, config);

      console.log(report)
      // Puedes realizar operaciones adicionales con la variable 'report' si es necesario
      // Por ejemplo, puedes agregar eventos o ajustar la configuración del informe.
    };

    return {
      reportContainer,
    };
  },
};
</script>
